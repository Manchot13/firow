import { angleAtom, isDraggingAtom, pomodoroTimeAtom } from "@/globalStateAtoms/atoms";
import { useAtom } from "jotai";
import { useState } from "react";

export default function TimerInputClock() {
    const [angle, setAngle] = useAtom(angleAtom); // 現在の角度
    const [time, setTime] = useAtom(pomodoroTimeAtom); // 合計時間（分）
    const [isDragging, setIsDragging] = useAtom(isDraggingAtom);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
        if (!isDragging) return;

        // 中心からの角度を計算
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const radians = Math.atan2(dy, dx);
        const newAngle = (radians * (180 / Math.PI) + 360) % 360; // ラジアンを度に変換

        // 角度から時間を計算 (60分を1周とする)
        const totalMinutes = Math.round((newAngle / 360) * 60) + Math.floor(time / 60) * 60;
        setAngle(newAngle);
        setTime(totalMinutes);
    };

    const handleInputChange = (e: { target: { value: any; }; }) => {
        const value = Math.max(0, Number(e.target.value));
        setTime(value);
        setAngle((value % 60 / 60) * 360);
    };

    const formatTime = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div
            className="bg-gray-200 p-5 absolute right-5 top-5 w-[15%] min-w-64 rounded-xl shadow-lg divide-y-2"
            onClick={(e) => e.stopPropagation()} // 子要素クリックで背景イベントを止める
            aria-label="Timer Input Clock"
        >
            {/* 時計の背景 */}
            <div
                className="relative w-56 h-56 bg-gray-100 rounded-full shadow-md"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => setIsDragging(true)}
                onTouchMove={(e) => {
                    if (!isDragging) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const touch = e.touches[0];
                    const dx = touch.clientX - centerX;
                    const dy = touch.clientY - centerY;
                    const radians = Math.atan2(dy, dx);
                    const newAngle = (radians * (180 / Math.PI) + 360) % 360;
                    const totalMinutes = Math.round((newAngle / 360) * 60) + Math.floor(time / 60) * 60;
                    setAngle(newAngle);
                    setTime(totalMinutes);
                }}
                onTouchEnd={() => setIsDragging(false)}
                aria-label="Clock Interface"
            >
                {/* 時計のセクター */}
                <div
                    className="absolute w-full h-full bg-blue-300 rounded-full clip-circle"
                    style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${
                            50 + 50 * Math.cos((angle - 90) * (Math.PI / 180))
                        }% ${50 + 50 * Math.sin((angle - 90) * (Math.PI / 180))}%, 50% 50%)`,
                    }}
                    aria-hidden="true"
                />

                {/* 時計の針 */}
                <div
                    className="relative w-1 h-28 bg-blue-500 origin-bottom rounded-full"
                    style={{ transform: `rotate(${angle}deg)`, left: "50%" }}
                    onMouseDown={handleMouseDown}
                    aria-hidden="true"
                />
                <div
                    className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full"
                    style={{ left: "calc(50% - 12px)", top: "calc(50% - 12px)" }}
                    aria-hidden="true"
                />
            </div>

            {/* 時間表示と入力 */}
            <div className="mt-5 flex flex-col items-center">
                <div className="text-xl font-semibold text-gray-700">
                    {formatTime(time)}
                </div>
                <input
                    type="number"
                    min="0"
                    value={time}
                    onChange={handleInputChange}
                    className="mt-2 w-20 p-2 border rounded text-center text-lg"
                    aria-label="Time Input"
                />
            </div>
        </div>
    );
}
