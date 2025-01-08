import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
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
    const [isPomodoroType, setIsPomodoroType] = useAtom(PomodoroType); // モーダルの表示/非表示
    const setBreatheFinishedState = useSetAtom(setBreatheFinished); // セッション終了通知
    const [isFocusPhase, setFocusPhase] = useAtom(poromodoFocusPhase); // 現在が集中か休憩かを管理
    const [remainingTime, setRemainingTime] = useAtom(remainingPoromodoTime); // 現在のフェーズの残り時間（秒単位）
    const [elapsedTime, setElapsedTime] = useAtom(elapsedPoromodoTime); // カウントアップで経過した時間（秒）
    const [sessionCounter, setSessionCounter] = useAtom(porodomoSessionCounter); // 現在のセッション数
    const maxSessions = useAtomValue(pomodoroTimesAtom); // 最大セッション数
    const breakTime = useAtomValue(pomodoroBreakTimeAtom)*60; // 休憩時間（秒）

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
                if (isPomodoroType==="CountUp") {
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
            <div className="relative w-full h-full">
                <div className="absolute flex items-center left-8 bg-slate-50 shadow-xl bottom-8 p-8 rounded-2xl text-center">
                    <div className="text-[6vw] align-text-bottom mr-4">
                        {isPomodoroType==="CountUp" ? formatTime(elapsedTime) : formatTime(remainingTime)} 
                    </div>
                    <div className=" tracking-wider flex-col justify-center">
                        <h2 className="text-2xl tracking-wider mb-4">
                            {isPomodoroType==="CountUp"
                                ? "Count Up Time"
                                : isFocusPhase
                                ? "Focus Time"
                                : "Break Time"}
                        </h2>
                        {isPomodoroType==="Pomodoro" && (
                            <div className="my-4 text-gray-500">
                                Session {sessionCounter + (isFocusPhase ? 1 : 0)} /{" "}
                                {maxSessions}
                            </div>
                        )}
                        <div className="mt-4 flex gap-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => setModalOpen(false)}
                            >
                                End Session
                            </button>
                        </div>
                    </div>
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        onClick={() => setModalOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>
            </div>
    ) : null;
}
