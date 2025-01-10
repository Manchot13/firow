import { breatheSwitch, pomodoroSwitch, settingType } from "@/globalStateAtoms/atoms";
import { useAtom, useSetAtom } from "jotai";
import { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
};

export default function PageFunction({ title, icon }: Props) {

    return (
        <div className="flex p-2 flex-col items-center justify-center">
            <button
                className="aspect-square rounded-[20%]"
            >
                <div className="">
                    <div className="flex items-center justify-center text-4xl">
                        {icon}
                    </div>
                </div>
            </button>
            <p className="text-center font-bold text-lg">{title}</p>
        </div>
    );
}