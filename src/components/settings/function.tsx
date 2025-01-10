import { breatheSwitch, pomodoroSwitch, settingType } from "@/globalStateAtoms/atoms";
import { useAtom, useSetAtom } from "jotai";
import { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
    type: 'Pomodoro' | 'Breathe' | 'none';

};

export default function Function({ title, icon, type }: Props) {
    const [isPomodoroOn, setIsPomodoroOn] = useAtom(pomodoroSwitch);
    const [isBreatheOn, setIsBreatheOn] = useAtom(breatheSwitch);
    const setSettingType = useSetAtom(settingType)

    const handleToggle = () => {
        if (type !== "none") { // typeが"none"でない場合のみ実行
            if (type === "Pomodoro") {
                setIsPomodoroOn(!isPomodoroOn);
            } else if (type === "Breathe") {
                setIsBreatheOn(!isBreatheOn);
            }
            setSettingType(type);
        }
    };

    return (
        <div className="w-[40%] flex flex-col items-center justify-center">
            <button 
                className="bg-snow-50 hover:bg-snow-200 aspect-square rounded-[20%] w-[90%] text-[100%]"
                onClick={handleToggle} 
            >
                <div className="w-full h-full flex ">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                        {icon}
                    </div>
                </div>
            </button>
            <p className="text-center font-bold text-lg mt-2">{title}</p>
        </div>
    );
}