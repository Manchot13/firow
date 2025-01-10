import { IoTextSharp } from "react-icons/io5";
import CircleContext from "./circleContext";
import { fontType } from "@/globalStateAtoms/atoms";
import { useAtom } from "jotai";


export default function SettingAdvance() {
    const [isFontType, setFontType] = useAtom(fontType);

    const handleToggle = (type: string) => {
        setFontType(type);
    };

    return (
        <div className=" divide-gray-400 divide-y-2">
            <div>
                <p className='font-bold pt-4'>
                    Fonts
                </p>
                <div className='flex flex-col my-5 justify-center gap-2'>
                    <div onClick={() => handleToggle("JaSelif")} className={`p-2 ${(isFontType === "JaSelif") ? "bg-snow-300 rounded-2xl" : ""}`}>
                        <CircleContext title="Ja selif" icon={<IoTextSharp />} subTitle={""} />
                    </div>
                    <div onClick={() => handleToggle("JaPixel")} className={`p-2 ${(isFontType === "JaPixel") ? "bg-snow-300 rounded-2xl" : ""}`}>
                        <CircleContext title="Ja pixel" icon={<IoTextSharp />} subTitle={""} />
                    </div>

                    {/* <div onClick={() => handleToggle("EnPixel")} className={`${(isFontType === "EnPixel") ? "bg-snow-300 rounded-2xl" : ""}`}>
                        <CircleContext title="En pixel" icon={<IoTextSharp />} subTitle={""} />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
