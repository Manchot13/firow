import { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { settingType } from "@/globalStateAtoms/atoms";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    title: string;
    icon: ReactNode;
    type: "Source" | "Advance";
};

export default function sentenceFunction({ title,icon, type }: Props) {
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
            <div className="ml-auto">
                <IoIosArrowForward />
            </div>
        </div>
    );
}
