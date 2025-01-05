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
    const drumContainerRef = useRef<HTMLDivElement>(null);
    const [isBreatheTime, setBreatheTime] = useAtom(breatheTimeAtom);
    const [isPomodoroTime, setPomodoroTime] = useAtom(pomodoroTimeAtom);
    const itemHeight = 40;

    const deltaTime = endTime - startTime;
    const TimePerInterval = deltaTime / timeInterval;

    const isSwitchTime = () => {
        switch (tag) {
            case 'Breathe':
                return isBreatheTime;
            case 'Pomodoro':
                return isPomodoroTime;
        }
    };

    const SetSwitchTime = (index: any) => {
        switch (tag) {
            case 'Breathe':
                return setBreatheTime(Math.trunc(index)); // 修正: setMinutesを削除し、indexを使用;
            case 'Pomodoro':
                return setPomodoroTime(Math.trunc(index)); // 修正: setMinutesを削除し、indexを使用;
            default:
                return 0;
        }
    }


    const handleScroll = (e: React.WheelEvent) => {
        e.preventDefault();

        const scrollSensitivity = 0.2; // スクロール感度（値を小さくして変化を緩やかに）
        const delta = e.deltaY * scrollSensitivity; // スクロール量に感度を掛ける

        const switchTimeValue = isSwitchTime(); // 現在の値を取得
        if (switchTimeValue !== undefined) {
            // スクロールで値を変更
            const newTime = switchTimeValue + delta * timeInterval;

            // 範囲内に制限
            const clampedTime = Math.max(startTime, Math.min(newTime, endTime));

            // インデックス計算
            const selectedIndex = Math.round((clampedTime - startTime) / timeInterval);

            // 更新処理を呼び出し
            SetSwitchTime(selectedIndex * timeInterval + startTime); // インデックスを実際の時間に変換
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

                // 0未満の場合は0に設定
                const finalTop = Math.max(nearestTop, 0);
                drumContainerRef.current.style.top = `${finalTop}px`;
                const selectedIndex = Math.abs(Math.round(finalTop / itemHeight)) % Math.trunc(deltaTime / timeInterval);
                SetSwitchTime(selectedIndex)
            }
        };

        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);
    };

    const handleTap = (index: number) => {
        SetSwitchTime(index)
        setSettingType(tag);
    };

    useEffect(() => {
        if (drumContainerRef.current) {
            const switchTimeValue = isSwitchTime(); // isSwitchTimeを呼び出して値を取得
            if (switchTimeValue !== undefined) {
                drumContainerRef.current.style.top = `-${(switchTimeValue - 4) * itemHeight}px`;
            }
        }
    }, [isSwitchTime]);


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
                    <div ref={drumContainerRef} className="absolute w-full text-xl">
                        {[...Array(Math.floor(deltaTime) + 1)].map((_, index) => {
                            const timeValue = startTime + index * timeInterval;

                            // 現在のスクロール位置を取得
                            return (
                                <div
                                    key={index}
                                    className={`h-[40px] flex items-center justify-center cursor-pointer text-snow-400 ${index === Math.trunc(isSwitchTime() ?? 0) - 1 ? "font-bold text-3xl text-snow-700" : ""}`}
                                    onClick={() => handleTap(timeValue)}
                                >
                                    {timeValue}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mt-2 pt-2 border-t-2 border-snow-600 text-xl font-semibold ">
                    {Math.trunc(isSwitchTime() ?? 0)} 分
                </div>
            </div>
        </MantineProvider>
    );
}

