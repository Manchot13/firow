import { useState } from "react";

export default function Se() {
    const [angle, setAngle] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        // 中心からの角度を計算
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const radians = Math.atan2(dy, dx);
        const newAngle = radians * (180 / Math.PI); // ラジアンを度に変換
        setAngle(newAngle);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
        >
            {/* 回転バー */}
            <div
                className="relative w-20 h-4 bg-blue-500 rounded-full cursor-pointer"
                onMouseDown={handleMouseDown}
                style={{ transform: `rotate(${angle}deg)` }}
            />

            {/* 入力フィールド */}
            <input
                type="number"
                value={Math.round(angle)}
                readOnly
                className="mt-5 p-2 border rounded"
            />
        </div>
    );
}
