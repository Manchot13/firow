import { BsCloudRain } from "react-icons/bs";
import { CgEditNoise } from "react-icons/cg";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import CircleButton from "./circleButton";

export default function SettingAdvance() {


    return (

        <div className=" divide-gray-400 divide-y-2">
                <p className='font-bold pt-4'>
                    Fonts
                </p>
                <div className='flex my-5 justify-center gap-[5%]'>
                    <CircleButton title="Ja selif" icon={<BsCloudRain />} />
                    <CircleButton title="Ja pixel" icon={<CgEditNoise />} />
                    <CircleButton title="En pixel" icon={<MdOutlineLocalFireDepartment />} />
                </div>
            </div>
    );
}
