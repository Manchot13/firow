import { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
};

export default function CircleButton({ title, icon }: Props) {
    return (
        <div className="w-[30%] flex flex-col justify-center items-center">
            <div className="bg-snow-100 hover:bg-gray-100 aspect-square rounded-full w-[90%] text-[100%]">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                        {icon}
                    </div>
                </div>
            </div>
            <p className="text-center text-lg font-bold mt-2">{title}</p>
        </div>
    );
}
