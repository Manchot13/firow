import SettingDrumRoll from "./settingDrumRoll";

export default function SettingPomodoro() {

    return (
        <div>
            <SettingDrumRoll startTime={0} endTime={50} timeInterval={5} tag={"Pomodoro"}/>
        </div>
    );
}
