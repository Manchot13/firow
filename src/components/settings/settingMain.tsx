import Sound from "@/components/settings/sound";
import Function from "@/components/settings/function";
import ButtonFunction from "@/components/settings/buttonFunction";
import { CgEditNoise } from "react-icons/cg";
import { FiClock } from 'react-icons/fi';
import { FaTasks } from 'react-icons/fa';


export default function SettingMain() {

    return (
        <div
            className="bg-gray-200 p-5 absolute right-5 top-5 w-[15%] rounded-xl shadow-lg divide-gray-400 divide-y-2"
            onClick={(e) => e.stopPropagation()} // 子要素クリックで背景イベントを止める
        >
            <div >
                <p className='font-bold'>
                    Sound
                </p>
                <div className='flex my-5'>
                    <Sound title="title" icon={<CgEditNoise />} />
                    <Sound title="title" icon={<CgEditNoise />} />
                    <Sound title="title" icon={<CgEditNoise />} />
                </div>
            </div>
            <div >
                <p className='font-bold mt-4'>
                    Function
                </p>
                <div className='flex my-5 justify-center gap-[10%]'>
                    <Function title="Pomodoro" icon={<CgEditNoise />} type='pomodoro' />
                    <Function title="Breath" icon={<CgEditNoise />} type='breath' />
                </div>
            </div>
            <div >
                <p className='font-bold mt-4'>
                    Modal
                </p>
                <div className='my-5 relative grid-row-2 grid gap-[10%]'>
                    <ButtonFunction title="Clock" icon={<FiClock />} type='clock' />
                    <ButtonFunction title="ToDo List" icon={<FaTasks />} type='todo' />
                </div>
            </div>
        </div>
    );
}
