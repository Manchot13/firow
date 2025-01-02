import { breatheTimeAtom, settingType } from "@/globalStateAtoms/atoms";
import { useAtomValue, useSetAtom } from "jotai";
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
    const breathTime = useAtomValue(breatheTimeAtom)

    return (
        <div className=" divide-gray-400 divide-y-2">

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
                <TextFunction title={"Time"} icon={<></>} type={"Drum_Roll"} subtitle={`${breathTime} 分`} />
            </div>
        </div>
    );
}
