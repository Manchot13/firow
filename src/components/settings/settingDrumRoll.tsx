import { breatheTimeAtom, pomodoroTimeAtom, settingType } from "@/globalStateAtoms/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useEffect } from "react";
import { MantineProvider } from "@mantine/core";

type Props = {
    startTime: number;
    endTime: number;
    timeInterval: number;
    tag: string;
};

// 修正済みコード
export default function SettingDrumRoll({ startTime, endTime, timeInterval, tag }: Props) {
    const setSettingType = useSetAtom(settingType);
    const drumContainerRef = useRef<HTMLDivElement>(null);
    const [isBreatheTime, setBreatheTime] = useAtom(breatheTimeAtom);
    const [isPomodoroTime, setPomodoroTime] = useAtom(pomodoroTimeAtom);
    const itemHeight = 40;

    const deltaTime = endTime - startTime;

    const isSwitchTime = () => {
        switch (tag) {
            case 'Breathe':
                return isBreatheTime;
            case 'Pomodoro':
                return isPomodoroTime;
        }
    };

    const SetSwitchTime = (value: number) => {
        switch (tag) {
            case 'Breathe':
                return setBreatheTime(value);
            case 'Pomodoro':
                return setPomodoroTime(value);
            default:
                return;
        }
    };

    const handleScroll = (e: React.WheelEvent) => {
        e.preventDefault();

        const scrollSensitivity = 0.1; // スクロール感度を調整
        const delta = e.deltaY * scrollSensitivity;

        const switchTimeValue = isSwitchTime();
        if (switchTimeValue !== undefined) {
            const newTime = switchTimeValue + delta * timeInterval;
            const clampedTime = Math.max(startTime, Math.min(newTime, endTime));
            const selectedIndex = Math.round((clampedTime - startTime) / timeInterval);
            SetSwitchTime(selectedIndex * timeInterval + startTime);
        }
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const initialTop = drumContainerRef.current?.offsetTop || 0;

        const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
            const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
            const deltaY = currentY - startY;
            if (drumContainerRef.current) {
                const newTop = initialTop + deltaY;
                drumContainerRef.current.style.top = `${newTop}px`;
            }
        };

        const handleDragEnd = () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
            if (drumContainerRef.current) {
                const currentTop = drumContainerRef.current.offsetTop || 0;
                const nearestTop = Math.round(currentTop / itemHeight) * itemHeight;
                const finalTop = Math.max(nearestTop, 0);
                drumContainerRef.current.style.top = `${finalTop}px`;
                const selectedIndex = Math.round(finalTop / itemHeight);
                const newValue = startTime + selectedIndex * timeInterval;
                SetSwitchTime(newValue);
            }
        };

        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);
    };

    const handleTap = (timeValue: number) => {
        SetSwitchTime(timeValue);
        setSettingType(tag);
    };

    useEffect(() => {
        if (drumContainerRef.current) {
            const switchTimeValue = isSwitchTime();
            if (switchTimeValue !== undefined) {
                const offsetIndex = Math.round((switchTimeValue - startTime) / timeInterval);
                drumContainerRef.current.style.top = `-${offsetIndex * itemHeight}px`;
            }
        }
    }, [isSwitchTime]);

    return (
        <MantineProvider>
            <div className="divide-y-2">
                <div
                    className="relative h-[200px] overflow-hidden"
                    onWheel={handleScroll}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                >
                    <div ref={drumContainerRef} className="absolute w-full text-xl">
                        {[...Array(Math.floor(deltaTime / timeInterval) + 1)].map((_, index) => {
                            const timeValue = startTime + index * timeInterval;
                            return (
                                <div
                                    key={index}
                                    className={`h-[40px] flex items-center justify-center cursor-pointer ${
                                        timeValue === isSwitchTime() ? "font-bold text-3xl text-snow-700" : "text-snow-400"
                                    }`}
                                    onClick={() => handleTap(timeValue)}
                                >
                                    {timeValue}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mt-2 pt-2 border-t-2 border-snow-600 text-xl font-semibold">
                    {isSwitchTime()} 分
                </div>
            </div>
        </MantineProvider>
    );
}

