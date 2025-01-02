import SettingDrumRoll from "./settingDrumRoll";

export default function SettingPomodoro() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-20 h-4 bg-blue-500 rounded-full cursor-pointer">
                <SettingDrumRoll startTime={0} endTime={180} timeInterval={5}/>
            </div>
        </div>
    );
}
