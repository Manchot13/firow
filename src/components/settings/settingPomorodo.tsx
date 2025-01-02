
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
            className=" divide-gray-400 divide-y-2"
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
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle - 90) * (Math.PI / 180))
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
