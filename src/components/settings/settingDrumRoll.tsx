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

export default function SettingDrumRoll({ startTime, endTime, timeInterval, tag }: Props) {
    const setSettingType = useSetAtom(settingType);
    const [minutes, setMinutes] = useAtom(breatheTimeAtom);
    const drumContainerRef = useRef<HTMLDivElement>(null);
    const setBreatheTime = useSetAtom(breatheTimeAtom);
    const setPomodorotime = useSetAtom(pomodoroTimeAtom);
    const itemHeight = 40;

    const deltaTime = endTime - startTime;
    const TimeNumber = deltaTime / timeInterval;

    const switchTag = (index: number) => {
        switch (tag) {
            case 'Breathe':
                return setBreatheTime(Math.trunc(index)); // 修正: setMinutesを削除し、indexを使用;
            case 'Pomodoro':
                return setPomodorotime(Math.trunc(index)); // 修正: setMinutesを削除し、indexを使用;
            default:
            case 'Breathe':
                return setBreatheTime(Math.trunc(index)); // 修正: setMinutesを削除し、indexを使用;
        }
    };


    const handleScroll = (e: React.WheelEvent) => {
        e.preventDefault();
        const scrollSensitivity = 0.5; // スクロール速度調整係数
        const delta = Math.sign(e.deltaY) * scrollSensitivity;
        setMinutes((prevMinutes) => {
            const newMinutes = prevMinutes + delta; // ループを削除
            return Math.max(0, Math.min(newMinutes, TimeNumber)); // 0~TimeNumber の範囲に制限
        });
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

                // 0未満の場合は0に設定
                const finalTop = Math.max(nearestTop, 0);
                drumContainerRef.current.style.top = `${finalTop}px`;
                const selectedIndex = Math.abs(Math.round(finalTop / itemHeight)) % Math.trunc(deltaTime / timeInterval);
                setMinutes(selectedIndex);
            }
        };

        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);
    };

    const handleTap = (index: number) => {
        setMinutes(index); // タップしたインデックスをminutesに設定
        switchTag(index)
        setSettingType(tag);
    };

    useEffect(() => {
        if (drumContainerRef.current) {
            drumContainerRef.current.style.top = `-${(minutes - 4) * itemHeight - 1}px`;
        }
    }, [minutes]);

    return (
        <MantineProvider>
            <div
                className="divide-y-2"
            >
                <div
                    className="relative h-[200px] overflow-hidden"
                    onWheel={handleScroll}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                >
                    <div ref={drumContainerRef} className="absolute w-full">
                        {[...Array(Math.floor(TimeNumber) + 1)].map((_, index) => {
                            const timeValue = startTime + index * timeInterval;
                            return (
                                <div
                                    key={index}
                                    className={`h-[40px] flex items-center justify-center text-xl ${timeValue === minutes ? "font-bold text-3xl" : ""}`}
                                    onClick={() => handleTap(timeValue)}
                                >
                                    {timeValue}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="text-center mt-2 pt-2 border-t-2 border-snow-600 text-xl font-semibold ">
                    {Math.trunc(minutes * timeInterval)} 分
                </div>
            </div>
        </MantineProvider>
    );
}
