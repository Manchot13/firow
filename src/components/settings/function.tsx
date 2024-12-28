import { breathSwitch, pomodoroSwitch, settingType } from "@/globalStateAtoms/atoms";
import { useAtom, useSetAtom } from "jotai";
import { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
    type: 'Pomodoro' | 'Breath';

};

export default function Function({ title, icon, type }: Props) {
    const [isPomodoroOn, setIsPomodoroOn] = useAtom(pomodoroSwitch);
    const [isBreathOn, setIsBreathOn] = useAtom(breathSwitch);
    const setSettingType = useSetAtom(settingType)
    
    const handleToggle = () => {
        if (type === "Pomodoro") {
            setIsPomodoroOn(!isPomodoroOn);
        } else if (type === "Breath") {
            setIsBreathOn(!isBreathOn);
        }
        setSettingType(type);
    };

    return (
        <div className="w-[40%] items-center justify-center">
            <button className="bg-white  hover:bg-gray-100 aspect-square rounded-[20%] w-[90%] text-[100%]"
                onClick={handleToggle}>
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
