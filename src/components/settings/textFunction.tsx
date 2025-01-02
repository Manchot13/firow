import { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { settingType } from "@/globalStateAtoms/atoms";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    title: string;
    subtitle: string;
    icon: ReactNode;
    type: "Source" | "Advance" | "Drum_Roll" | "";
};

export default function TextFunction({ title,subtitle,icon, type }: Props) {
    const setSettingType = useSetAtom(settingType);

    const handleToggle = () => {
        setSettingType(type);
    };
    return (
        <div className="flex items-center cursor-pointer hover:bg-snow-300 p-2 rounded-md relative w-full" onClick={handleToggle}>
            {icon}
            <p className="text-center ml-2 text-lg font-bold">
                {title}
            </p>
            <p className="text-center ml-auto text-base text-snow-600 font-bold">
                {subtitle}
            </p>
            <div className="">
                <IoIosArrowForward />
            </div>
        </div>
    );
}
