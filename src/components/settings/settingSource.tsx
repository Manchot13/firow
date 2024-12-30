import { settingType } from "@/globalStateAtoms/atoms";
import { useSetAtom } from "jotai";
import { IoIosArrowBack } from "react-icons/io";

export default function SettingSource() {
    const setSettingType = useSetAtom(settingType);
    const handleClick = () => {
        setSettingType("Setting");
    };

    return (
        <div
            className="bg-gray-200 p-5 absolute right-5 top-5 w-[15%] min-w-64 rounded-xl shadow-lg divide-y-2"
            onClick={(e) => e.stopPropagation()} // 子要素クリックで背景イベントを止める
        >
            <div className="font-bold mt-6 text-2xl">
                Source
            </div>
            <button
                onClick={handleClick} // ボタンのみでクリックを処理
                className="absolute left-2 top-3 border-none"
            >
                <IoIosArrowBack/>
            </button>
        </div>
    );
}
