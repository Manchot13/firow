import { ReactNode } from "react";

type Props = {
    title: string;
    subTitle: string;
    icon: ReactNode;
};

export default function circleContext({ title, subTitle, icon }: Props) {
    return (
        <div className="flex gap-4 items-center">
            <div className=" relative">
                <div className="bg-white hover:bg-gray-100 aspect-square rounded-full w-full text-[100%]">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center text-2xl m-5">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-2xl font-bold mt-2">{title}</p>
                <p className="text-base font-bold mt-2 text-snow-400">{subTitle}</p>
            </div>
        </div>
    );
}
