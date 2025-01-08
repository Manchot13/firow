import Function from "@/components/settings/function";
import ButtonFunction from "@/components/settings/buttonFunction";
import { CgTimer } from "react-icons/cg";
import { FiClock } from 'react-icons/fi';
import { FaTasks } from 'react-icons/fa';
import { LuLeaf, LuSettings2 } from "react-icons/lu";
import TextFunction from "./textFunction";
import { PiTextAlignLeftBold } from "react-icons/pi";


export default function SettingMain() {

    return (
        <div className=" divide-gray-400 divide-y-2">
            {/* <div>
                <p className='font-bold'>
                    Sound
                </p>
                <div className='flex my-5 justify-center gap-[5%]'>
                    <CircleButton title="Rain" icon={<BsCloudRain />} />
                    <CircleButton title="Noise" icon={<CgEditNoise />} />
                    <CircleButton title="Fire" icon={<MdOutlineLocalFireDepartment />} />
                </div>
            </div> */}
            <div >
                <p className='font-bold mt-4'>
                    Function
                </p>
                <div className='flex my-5 justify-center gap-[10%]'>
                    <Function title="Pomodoro" icon={<CgTimer />} type='Pomodoro' />
                    <Function title="Breathe" icon={<LuLeaf />} type='Breathe' />
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
            <div className="flex py-4 items-center relative w-full">
                <TextFunction title={"Advance"} type={"Advance"} icon={<LuSettings2 />} text={undefined}/>
            </div>
            <div className="flex pt-4 items-center relative w-full">
                <TextFunction title={"Source"} type={"Source"} icon={<PiTextAlignLeftBold />} text={undefined} />
            </div>
        </div>
    );
}
