import { breatheTimeAtom, settingType } from "@/globalStateAtoms/atoms";
import { useSetAtom } from "jotai";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { MantineProvider } from "@mantine/core";

type Props = {
    startTime: number;
    endTime: number;
    timeInterval: number;
};

export default function SettingDrumRoll({startTime, endTime, timeInterval}: Props) {
    const setSettingType = useSetAtom(settingType);
    const [minutes, setMinutes] = useState(0);
    const drumContainerRef = useRef<HTMLDivElement>(null);
    const setBreathtime = useSetAtom(breatheTimeAtom);
    
    const deltaTime = endTime - startTime;

    const handleClick = () => {
        setSettingType("Setting");
    };

    const handleScroll = (e: React.WheelEvent) => {
        e.preventDefault();
        const scrollSensitivity = 0.1; // スクロール速度調整係数
        const delta = Math.sign(e.deltaY) * scrollSensitivity;
        setMinutes((prevMinutes) => {
            const newMinutes = prevMinutes + delta; // ループを削除
            return Math.max(0, Math.min(newMinutes, 59)); // 0-59 の範囲に制限
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
                const itemHeight = 40;
                const currentTop = drumContainerRef.current.offsetTop || 0;
                const nearestTop = Math.round(currentTop / itemHeight) * itemHeight;

                // 0未満の場合は0に設定
                const finalTop = Math.max(nearestTop, 0);
                drumContainerRef.current.style.top = `${finalTop}px`;
                const selectedIndex = Math.abs(Math.round(finalTop / itemHeight)) % Math.trunc(deltaTime/timeInterval);
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
        setBreathtime (Math.trunc(minutes))
        setSettingType("Breathe");
    };

    useEffect(() => {
        if (drumContainerRef.current) {
            const itemHeight = 40;
            drumContainerRef.current.style.top = `-${minutes * itemHeight}px`;
        }
    }, [minutes]);

    return (
        <MantineProvider>
            <div
                className="bg-gray-200 p-5 absolute right-5 top-5 w-[15%] min-w-64 rounded-xl shadow-lg divide-y-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative h-[200px] overflow-hidden"
                    onWheel={handleScroll}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                >
                    <div
                        ref={drumContainerRef}
                        className="absolute w-full"
                    >
                        {[...Array(endTime - startTime + 1)].map((_, index) => (
                            <div
                                key={index}
                                className={`h-[40px] flex items-center justify-center text-xl ${index * timeInterval + startTime === minutes ? "font-bold" : ""}`}
                                onClick={() => handleTap(index * timeInterval + startTime)}
                            >
                                {index * timeInterval + startTime}
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4 text-xl font-semibold">
                        {Math.trunc(minutes)} 分
                    </div>
                </div>
                <button
                    onClick={handleClick}
                    className="absolute left-2 top-3 border-none"
                >
                    <IoIosArrowBack />
                </button>
            </div>
        </MantineProvider>
    );
}
