import { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
    type: 'pomodoro' | 'breath';

};

export default function Function({ title, icon, type }: Props) {
    return (
        <div className="w-[40%] items-center justify-center">
            <div className="bg-white aspect-square rounded-[20%] w-[90%] text-[100%]">
                <div className="w-full h-full flex ">
                    <div className="w-full h-full flex items-center justify-center">
                        {icon}
                    </div>
                </div>
            </div>
            <p className="text-center font-bold text-lg mt-2">{title}</p>
        </div>
    );
}
