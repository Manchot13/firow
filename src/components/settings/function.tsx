import { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
    type: 'pomodoro' | 'breath';

};

export default function Function({ title, icon, type }: Props) {
    return (
        <div className="w-1/3">
            <div className="bg-white aspect-square rounded-[20%] w-[90%] text-[100%]">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                        {icon}
                    </div>
                </div>
            </div>
            <p className="text-center font-bold mt-2">{title}</p>
        </div>
    );
}
