import { ReactNode } from "react";
import { useAtom } from "jotai";
import { clockSwitch, toDoSwitch } from "@/globalStateAtoms/atoms";
import SwitchButton from "./switchButton";

type Props = {
    title: string;
    icon: ReactNode;
    type: "clock" | "todo";
};

export default function ButtonFunction({ title, icon, type }: Props) {
    const [isClockOn, setIsClockOn] = useAtom(clockSwitch);
    const [isToDoOn, setIsToDoOn] = useAtom(toDoSwitch);

    const handleToggle = () => {
        if (type === "clock") {
            setIsClockOn(!isClockOn);
        } else if (type === "todo") {
            setIsToDoOn(!isToDoOn);
        }
    };

    const isOn = type === "clock" ? isClockOn : isToDoOn;

    return (
        <div className="flex mx-2 items-center">
            <div className="mr-4">{icon}</div>
            <p className="text-center text-lg font-bold">{title}</p>
            <div className="ml-auto">
                <SwitchButton isOn={isOn} onToggle={handleToggle}/>
            </div>
        </div>
    );
}
