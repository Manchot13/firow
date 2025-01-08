import { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { settingType } from "@/globalStateAtoms/atoms";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    title: string;
    icon: ReactNode;
    text: ReactNode;
    type: "Source" | "Advance" | "Drum_Roll" | "";
};

export default function TextFunction({ title, icon, type }: Props) {
    const setSettingType = useSetAtom(settingType);

    const handleToggle = () => {
        setSettingType(type);
    };
    return (
        <div className="flex items-center cursor-pointer hover:bg-snow-300 p-2 rounded-md relative w-full justify-between" onClick={handleToggle}>
            <div className="flex items-center">
                {icon}
                <p className="text-center ml-2 text-lg font-bold">
                    {title}
                </p>
            </div>
            <div className="flex items-center">
                <div>

                </div>
                <IoIosArrowForward />
            </div>
        </div>
    );
}
