import { settingType } from "@/globalStateAtoms/atoms";
import { useSetAtom } from "jotai";
import { IoIosArrowBack } from "react-icons/io";
import { RiFocusLine } from "react-icons/ri";
import { SiStagetimer } from "react-icons/si";
import { TbBed } from "react-icons/tb";
import CircleContext from "./circleContext";
import TextFunction from "./textFunction";

export default function SettingBreathe() {
    const setSettingType = useSetAtom(settingType);

    const handleClick = () => {
        setSettingType("Setting");
    };

    return (
        <div
            className="bg-gray-200 p-5 absolute right-5 top-5 w-[15%] min-w-64 rounded-xl shadow-lg divide-y-2"
            onClick={(e) => e.stopPropagation()} // 子要素クリックで背景イベントを止める
        >
            <div>
                <button
                    onClick={handleClick} // ボタンのみでクリックを処理
                    className="absolute left-2 top-3 border-none"
                >
                    <IoIosArrowBack />
                </button>
                <div className="font-bold mt-6 text-2xl">Breathe</div>
            </div>
            <div className="grid gap-4 mt-6">
                <CircleContext
                    title={"Normal"}
                    subTitle={"Just breathe in and out"}
                    icon={<SiStagetimer />}
                />
                <CircleContext
                    title={"For sleep"}
                    subTitle={"4-7-8 breathing"}
                    icon={<TbBed />}
                />
                <CircleContext
                    title={"For Focus"}
                    subTitle={"Box breathing"}
                    icon={<RiFocusLine />}
                />
            </div>
            <div className="mt-6">
                <TextFunction title={"Time"} icon={<></>} type={""} />
            </div>
        </div>
    );
}
