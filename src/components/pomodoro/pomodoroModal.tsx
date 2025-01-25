import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
    pomodoroTimeAtom,
    setBreatheFinished,
    pomodoroModalSwitch,
    PomodoroType,
    remainingPoromodoTime,
    poromodoFocusPhase,
    elapsedPoromodoTime,
    porodomoSessionCounter,
    pomodoroTimesAtom,
    pomodoroBreakTimeAtom,
} from "@/globalStateAtoms/atoms";

export default function PomodoroModal() {
    const [pomodoroTime] = useAtom(pomodoroTimeAtom); // 1セッションの集中時間（分）
    const [isModalOpen, setModalOpen] = useAtom(pomodoroModalSwitch); // モーダルの表示/非表示
    const isPomodoroType = useAtomValue(PomodoroType); // モーダルの表示/非表示
    const setBreatheFinishedState = useSetAtom(setBreatheFinished); // セッション終了通知
    const [isFocusPhase, setFocusPhase] = useAtom(poromodoFocusPhase); // 現在が集中か休憩かを管理
    const [remainingTime, setRemainingTime] = useAtom(remainingPoromodoTime); // 現在のフェーズの残り時間（秒単位）
    const [elapsedTime, setElapsedTime] = useAtom(elapsedPoromodoTime); // カウントアップで経過した時間（秒）
    const [sessionCounter, setSessionCounter] = useAtom(porodomoSessionCounter); // 現在のセッション数
    const maxSessions = useAtomValue(pomodoroTimesAtom); // 最大セッション数
    const breakTime = useAtomValue(pomodoroBreakTimeAtom) * 60; // 休憩時間（秒）

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // タイマー処理
    useEffect(() => {
        setRemainingTime(pomodoroTime * 60)
        let timer: NodeJS.Timeout | null = null;

        if (isModalOpen) {
            timer = setInterval(() => {
                if (isPomodoroType === "CountUp") {
                    // カウントアップモード
                    setElapsedTime((prev) => prev + 1);
                } else {
                    // カウントダウンモード
                    setRemainingTime((prev) => {
                        if (prev > 0) {
                            return prev - 1;
                        } else {
                            clearInterval(timer!);

                            // フェーズの切り替え
                            if (isFocusPhase) {
                                // 集中フェーズ終了 → 休憩フェーズに移行
                                if (sessionCounter + 1 < maxSessions) {
                                    setFocusPhase(false);
                                    setRemainingTime(breakTime);
                                    setSessionCounter(sessionCounter + 1);
                                } else {
                                    // 全セッション終了
                                    setBreatheFinishedState(true);
                                    setModalOpen(false);
                                }
                            } else {
                                // 休憩フェーズ終了 → 集中フェーズに戻る
                                setFocusPhase(true);
                                setRemainingTime(pomodoroTime * 60);
                            }

                            return 0;
                        }
                    });
                }
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [
        isModalOpen,
        isFocusPhase,
        sessionCounter,
        setBreatheFinishedState,
        setModalOpen,
        pomodoroTime,
        breakTime,
        maxSessions,
    ]);

    return isModalOpen ? (
        <div className="relative">
            <div className="bg-opacity-75 p-8 rounded-2xl text-center md:p-4">
                <h2 className="text-2xl text-left tracking-wider md:text-sm">
                    {isPomodoroType === "CountUp"
                        ? "Count Up Time"
                        : isFocusPhase
                            ? "Focus Time"
                            : "Break Time"}
                </h2>
                <div className="text-[8vw] align-text-bottom md:text-2xl">
                    {isPomodoroType === "CountUp" ? formatTime(elapsedTime) : formatTime(remainingTime)}
                </div>
                <div className=" tracking-wider flex items-center">
                    {isPomodoroType === "Pomodoro" && (
                        <div className=" text-gray-500 flex items-end">
                            <p>Session</p> 
                            <p className="text-xl ml-2">{sessionCounter + (isFocusPhase ? 1 : 0)} /{" "}{maxSessions} </p>
                        </div>
                    )}
                    <div className="flex ml-auto">
                        <button
                            className="px-4 py-2 bg-trinidad-500 text-white rounded-lg hover:bg-trinidad-600"
                            onClick={() => setModalOpen(false)}
                        >
                            End Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
