import { breatheModalSwitch, breatheTimeAtom, breatheType, DrumRollTagATom, endTimeAtom, handleState, settingType, startTimeAtom, timeIntervalAtom } from "@/globalStateAtoms/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { IoIosArrowForward } from "react-icons/io";
import { RiFocusLine } from "react-icons/ri";
import { SiStagetimer } from "react-icons/si";
import { TbBed } from "react-icons/tb";
import CircleContext from "./circleContext";

export default function SettingBreathe() {
    const breathTime = useAtomValue(breatheTimeAtom)
    const startTime = useSetAtom(startTimeAtom)
    const endTime = useSetAtom(endTimeAtom)
    const timeInterval = useSetAtom(timeIntervalAtom)
    const tag = useSetAtom(DrumRollTagATom)
    const [isSetBreatheModal, setBreatheModal] = useAtom(breatheModalSwitch)
    const [isHandleModal, setHandleModal] = useAtom(handleState);
    const setSettingType= useSetAtom(settingType);
    const [IsBreatheType,setIsBreatheType] = useAtom(breatheType);

    const handleClick = () => {
        setSettingType("Setting");
        setHandleModal(isHandleModal === 'close' ? 'open' : 'close');
    };

    const handleToggle = () => {
        setSettingType("DrumRoll");
        startTime(1)
        endTime(15)
        timeInterval(1)
        tag("Breathe")
    };
    const startBreath = () => {
        setBreatheModal(!isSetBreatheModal);
    }
    return (
        <div className=" divide-gray-400 divide-y-2">
            <div className="grid gap-4 mt-6">
                <button className={`px-4 py-2 ${IsBreatheType === "Normal" ? "bg-snow-300 rounded-2xl" : ""}`} onClick={() => setIsBreatheType("Normal")}>
                    <CircleContext
                        title={"Normal"}
                        subTitle={"Just breathe"}
                        icon={<SiStagetimer />} //7-0-7
                    />
                </button>
                <button className={`px-4 py-2 ${(IsBreatheType === "Sleep") ? "bg-snow-300 rounded-2xl" : ""}`} onClick={() => setIsBreatheType("Sleep")}>
                    <CircleContext
                        title={"For sleep"}
                        subTitle={"4-7-8 breathing"}
                        icon={<TbBed />} //4-7-8
                    />
                </button>
                <button className={`px-4 py-2 ${(IsBreatheType ==="Focus") ? "bg-snow-300 rounded-2xl" :""}`}  onClick={() => setIsBreatheType("Focus")}>
                    <CircleContext
                        title={"For Focus"}
                        subTitle={"Box breathing"}
                        icon={<RiFocusLine />} //5-5-5-5
                    />
                </button>
            </div>
            <div className="mt-6">
                <div className="flex items-center cursor-pointer hover:bg-snow-300 p-2 my-2 relative w-full" onClick={handleToggle}>
                    <p className="text-center ml-2 text-lg font-bold">
                        Time
                    </p>
                    <p className="text-center ml-auto text-base text-snow-600 font-bold">
                        {breathTime} 分
                    </p>
                    <div className="">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
            <div>
                <button className="flex items-center bg-snow-50 w-full rounded-lg py-2 mt-2 relative" onClick={() => { startBreath(); handleClick(); }}>
                    <div className="font-bold text-center w-full">
                        START
                    </div>
                </button>
            </div>
        </div>
    );
}
