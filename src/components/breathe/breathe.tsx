import { breatheModalSwitch, breatheModalSwitchCounter, breatheTimeAtom, breatheType, breatheWait, breatheWaitTime, circleSizeAtom, ElapsedTimeAtom, setBreatheFinished } from "@/globalStateAtoms/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Breathe() {
    const refTime = 10;
    const refreshPerSecond = 1000 / refTime;
    const isBreatheType = useAtomValue(breatheType);
    const [circleSize, setLocalCircleSize] = useAtom(circleSizeAtom);
    const breathTime = useAtomValue(breatheTimeAtom) * 60 * refreshPerSecond;
    const [elapsedTime, setElapsedTime] = useAtom(ElapsedTimeAtom);
    const [isSetBreatheModal, setBreatheModal] = useAtom(breatheModalSwitch);
    const [finished, setFinished] = useAtom(setBreatheFinished);
    const [isBreatheModalSwitchCounter, setBreatheModalSwitchCounter] = useAtom(breatheModalSwitchCounter);
    const [waiting, setWaiting] = useAtom(breatheWait); // Waiting state
    const [remainingTime, setRemainingTime] = useAtom(breatheWaitTime); // 7秒のカウントダウン

    let inhaleTime = isBreatheType === "Normal" ? 7 : isBreatheType === "Sleep" ? 4 : 5;
    let holdTime = isBreatheType === "Normal" ? 0 : isBreatheType === "Sleep" ? 7 : 5;
    let exhaleTime = isBreatheType === "Normal" ? 7 : isBreatheType === "Sleep" ? 8 : 5;
    let pauseTime = isBreatheType === "Focus" ? 5 : 0;

    inhaleTime = inhaleTime * refreshPerSecond;
    holdTime = holdTime * refreshPerSecond;
    exhaleTime = exhaleTime * refreshPerSecond;
    pauseTime = pauseTime * refreshPerSecond;

    const handleModal = () => {
        if (isBreatheModalSwitchCounter < 1) {
            setBreatheModalSwitchCounter((prev) => prev + 1);
            return;
        }
        setFinished(true); // Directly set finished to trigger modal close
        setBreatheModalSwitchCounter(0);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setWaiting(false);
        }, remainingTime * 1000 * 2);
    
        return () => clearTimeout(timer);
    }, [remainingTime, setWaiting]); 

    useEffect(() => {
        if (waiting) return; // Don't start breathing if waiting

        const totalCycleTime = inhaleTime + holdTime + exhaleTime + pauseTime;
        const timer = setInterval(() => {
            setElapsedTime((prev) => {
                if (prev >= breathTime) {
                    clearInterval(timer);
                    setFinished(true);
                    return prev;
                }
                return prev + 1;
            });

            const cyclePosition = (elapsedTime + 1) % totalCycleTime;
            const easingFunction = (t: number) => t * t * (3 - 2 * t); // イージング関数
            if (cyclePosition < inhaleTime) {
                const progress = cyclePosition / inhaleTime;
                setLocalCircleSize(30 + easingFunction(progress) * 50);
            } else if (cyclePosition < inhaleTime + holdTime) {
                setLocalCircleSize(80);
            } else if (cyclePosition < inhaleTime + holdTime + exhaleTime) {
                const progress = (cyclePosition - inhaleTime - holdTime) / exhaleTime;
                setLocalCircleSize(80 - easingFunction(progress) * 50);
            } else {
                setLocalCircleSize(30);
            }
        }, refTime);

        return () => clearInterval(timer);
    }, [elapsedTime, breathTime, inhaleTime, holdTime, exhaleTime, pauseTime, waiting]); // Add waiting to dependency array

    useEffect(() => {
        setLocalCircleSize(circleSize);
    }, [circleSize]);

    useEffect(() => {
        if (finished) {
            setBreatheModal(!isSetBreatheModal);
            setFinished(false); // Reset finished state
            setElapsedTime(0);
            setWaiting(true);
            setRemainingTime(2);
        }
    }, [finished, setBreatheModal, isSetBreatheModal]);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0; // 0に設定
                }
                return prev - 1; // 1秒減らす
            });
        }, 1000); // 1秒ごとに更新

        return () => clearInterval(timer); // クリーンアップ
    }, []);

    const totalCycleTime = inhaleTime + holdTime + exhaleTime + pauseTime;
    const cyclePosition = elapsedTime % totalCycleTime;

    if (waiting) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-snow-500 text-snow-700 font-[family-name:var(--font-geist-sans)]">
                <div className="bg-gray-200 p-5 w-[35%] relative aspect-square min-w-72 rounded-xl shadow-lg flex flex-col justify-center items-center">
                    <div className="my-auto">
                        <div className="text-4xl text-center md:text-2xl tracking-wider">
                            Waiting...
                        </div>
                        <div className="text-4xl text-center mt-4">
                            {remainingTime + 1}sec
                        </div>
                    </div>
                    <div className="tracking-wider text-center">
                        Breathe in through the nose.<br />
                        Hold breath.<br />
                        Exhale through the mouth.
                    </div>
                    <button
                        onClick={handleModal}
                        className=" absolute top-4 right-4 text-2xl"
                    >
                        <FaTimes />
                    </button>
                    {isBreatheModalSwitchCounter === 1 && (
                        <div className="text-center tracking-wider absolute -top-24 -right-12 text-2xl bg-white p-5 rounded-lg font-bold" onClick={() => setBreatheModalSwitchCounter(isBreatheModalSwitchCounter - 1)}>
                            Click one more!
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed font-[family-name:var(--font-geist-sans)] inset-0 flex items-center justify-center tracking-wider bg-snow-500 text-snow-700">
            <div className="bg-gray-200 p-5 absolute w-[35%] aspect-square min-w-72 rounded-xl shadow-lg flex justify-center items-center ">
                <div
                    style={{
                        width: `${circleSize}%`,
                        paddingTop: `${circleSize / 2}%`,
                        paddingBottom: `${circleSize / 2}%`,
                        // borderRadius: `41% 58% 42% 57% / 47% 47% 48% 44%`,
                    }}
                    className='bg-gradient-to-bl relative aspect-square m-auto from-snow-50 to-snow-800 border-[1px] rounded-full border-white'
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
