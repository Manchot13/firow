import { ReactNode } from "react";

type Props = {
    title: string; // 修正: `String` ではなく `string` を使用
    icon: ReactNode;
};

export default function Sound({ title, icon }: Props) {
    return (
        <div className="w-1/3">
            <div className="bg-white hover:bg-gray-100 aspect-square rounded-full w-[90%] text-[100%]">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                        {icon}
                    </div>
                </div>
            </div>
            <p className="text-center text-lg font-bold mt-2">{title}</p>
        </div>
    );
}
