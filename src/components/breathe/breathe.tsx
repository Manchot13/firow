import { breatheModalSwitch, breatheModalSwitchCounter, breatheTimeAtom, breatheType, circleSizeAtom, ElapsedTimeAtom, handleState, setBreatheFinished, settingType } from "@/globalStateAtoms/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Breathe() {
    const refTime = 20
    const refreshPerSecond = 1000 / refTime;

    const isBreatheType = useAtomValue(breatheType);
    const [circleSize, setLocalCircleSize] = useAtom(circleSizeAtom);
    const breathTime = useAtomValue(breatheTimeAtom) * 60 * refreshPerSecond;
    const [elapsedTime, setElapsedTime] = useAtom(ElapsedTimeAtom);
    const [isSetBreatheModal, setBreatheModal] = useAtom(breatheModalSwitch);
    const [finished, setFinished] = useAtom(setBreatheFinished); // 終了状態を管理
    const [isBreatheModalSwitchCounter, setBreatheModalSwitchCounter] = useAtom(breatheModalSwitchCounter);

    let inhaleTime = isBreatheType === "Sleep" ? 4 : 5;
    let holdTime = isBreatheType === "Normal" ? 0 : isBreatheType === "Sleep" ? 7 : 5;
    let exhaleTime = isBreatheType === "Normal" ? 5 : isBreatheType === "Sleep" ? 8 : 5;
    let pauseTime = isBreatheType === "Focus" ? 5 : 0;
    inhaleTime = inhaleTime * refreshPerSecond
    holdTime = holdTime * refreshPerSecond
    exhaleTime = exhaleTime * refreshPerSecond
    pauseTime = pauseTime * refreshPerSecond

    const handleModal = () => {
        if (isBreatheModalSwitchCounter < 1) {
            setBreatheModalSwitchCounter((prev) => prev + 1);
            <div className="absolute">
                click one more
            </div>
            return;
            
        }
        setFinished((prev) => !prev);
        setBreatheModalSwitchCounter(0);
    };



    useEffect(() => {
        const totalCycleTime = inhaleTime + holdTime + exhaleTime + pauseTime;
        const timer = setInterval(() => {
            setElapsedTime((prev) => {
                if (prev >= breathTime) {
                    clearInterval(timer);
                    setFinished(true); // 終了状態を設定
                    return prev;
                }
                return prev + 1;
            });

            const cyclePosition = (elapsedTime + 1) % totalCycleTime;

            if (cyclePosition < inhaleTime) {
                setLocalCircleSize(30 + (cyclePosition / inhaleTime) * 70);
            } else if (cyclePosition < inhaleTime + holdTime) {
                setLocalCircleSize(100);
            } else if (cyclePosition < inhaleTime + holdTime + exhaleTime) {
                setLocalCircleSize(100 - ((cyclePosition - inhaleTime - holdTime) / exhaleTime) * 70);
            } else {
                setLocalCircleSize(30);
            }
        }, refTime);
        return () => clearInterval(timer);
    }, [elapsedTime, breathTime, inhaleTime, holdTime, exhaleTime, pauseTime]);
    useEffect(() => {
        setLocalCircleSize(circleSize);
    }, [circleSize]);

    useEffect(() => {
        if (finished) {
            setBreatheModal(!isSetBreatheModal); // 終了時にモーダルを切り替え
            setFinished(!finished);
            setElapsedTime(0)
        }
    }, [finished, setBreatheModal, isSetBreatheModal]);

    const totalCycleTime = inhaleTime + holdTime + exhaleTime + pauseTime;
    const cyclePosition = elapsedTime % totalCycleTime;

    return (
        <div className="fixed font-[family-name:var(--font-geist-sans)] inset-0 flex items-center justify-center tracking-wider bg-snow-500 text-snow-700">
            <div className="bg-gray-200 p-5 absolute w-[30%] aspect-square min-w-72 rounded-xl shadow-lg flex justify-center items-center ">
                <div
                    style={{
                        width: `${circleSize}%`,
                        paddingTop: `${circleSize / 2}%`,
                        paddingBottom: `${circleSize / 2}%`,
                    }}
                    className={`rounded-full bg-gradient-to-bl relative aspect-square m-auto from-snow-50 to-snow-800 border-[1px] border-white`}
                >
                    <div className="flex items-center justify-center relative text-center h-full text-snow-800"
                        style={{
                            fontSize: `${circleSize * 2}%`
                        }}>
                        {finished
                            ? "Finished"
                            : cyclePosition < inhaleTime
                                ? "Inhale"
                                : cyclePosition < inhaleTime + holdTime
                                    ? "Hold"
                                    : cyclePosition < inhaleTime + holdTime + exhaleTime
                                        ? "Exhale"
                                        : "Pause"}
                    </div>
                </div>
                <button
                    onClick={handleModal}
                    className=" absolute top-4 right-4 text-2xl"
                >

                    <FaTimes />
                </button>
                {isBreatheModalSwitchCounter === 1 && (
                        <div className="text-center absolute -top-24 -right-12 text-2xl bg-white p-5 rounded-lg font-bold" onClick={() => setBreatheModalSwitchCounter(isBreatheModalSwitchCounter - 1)}>
                            Click one more!
                        </div>
                    )}
            </div>
        </div>
    );
}
