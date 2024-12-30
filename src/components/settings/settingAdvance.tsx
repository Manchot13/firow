import { settingType } from "@/globalStateAtoms/atoms";
import { useSetAtom } from "jotai";
import { BsCloudRain } from "react-icons/bs";
import { CgEditNoise } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import CircleButton from "./circleButton";

export default function SettingAdvance() {
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
                Advance
            </div>
            <div>
                <p className='font-bold pt-4'>
                    Fonts
                </p>
                <div className='flex my-5 justify-center gap-[5%]'>
                    <CircleButton title="Ja selif" icon={<BsCloudRain />} />
                    <CircleButton title="Ja pixel" icon={<CgEditNoise />} />
                    <CircleButton title="En pixel" icon={<MdOutlineLocalFireDepartment />} />
                </div>
            </div>
            <button
                onClick={handleClick} // ボタンのみでクリックを処理
                className="absolute left-2 top-3 border-none"
            >
                <IoIosArrowBack />
            </button>
        </div >
    );
}
