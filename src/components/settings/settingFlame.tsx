import { useAtom, useAtomValue } from 'jotai';
import { DrumRollTagATom, endTimeAtom, handleState, settingType, startTimeAtom, timeIntervalAtom } from '@/globalStateAtoms/atoms';
import SettingMain from './settingMain';
import { FaTimes } from 'react-icons/fa';
import SettingBreathe from './settingBreathe';
import SettingPomodoro from './settingPomorodo';
import SettingSource from './settingSource';
import SettingAdvance from './settingAdvance';
import { IoIosArrowBack } from 'react-icons/io';
import SettingDrumRoll from './settingDrumRoll';

export default function SettingFlame() {
    const [isHandleModal, setHandleModal] = useAtom(handleState);
    const [settingText, setSettingType] = useAtom(settingType);
    const startTime = useAtomValue(startTimeAtom);
    const endTime = useAtomValue(endTimeAtom);
    const timeInterval = useAtomValue(timeIntervalAtom);
    const tag = useAtomValue(DrumRollTagATom);

    const handleClick = () => {
        setSettingType("Setting");
        setHandleModal(isHandleModal === 'close' ? 'open' : 'close');
    };

    const returnHandleClick = () => {
        setSettingType("Setting");
    };


    const renderContent = () => {
        switch (settingText) {
            case 'Pomodoro':
                return <SettingPomodoro />;
            case 'Breathe':
                return <SettingBreathe />;
            case 'Source':
                return <SettingSource />;
            case 'Advance':
                return <SettingAdvance />;
            case 'DrumRoll':
                return <SettingDrumRoll startTime={startTime} endTime={endTime} timeInterval={timeInterval} tag={tag} />;
            default:
                return <SettingMain />;
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center tracking-wider backdrop-blur-sm bg-white bg-opacity-80 text-snow-700"
            onClick={handleClick}
        >
            <div className="bg-snow-100 p-5 absolute right-5 top-5 w-[15%] min-w-72 rounded-xl shadow-xl border-2 border-solid border-snow-200"
                onClick={(e) => e.stopPropagation()} // 子要素クリックで背景イベントを止める
            // 子要素クリックで背景イベントを止める
            >
                <div className='flex mb-4'>
                    {settingText != "Setting" && (<button
                        onClick={returnHandleClick} // ボタンのみでクリックを処理
                        className=""
                    >
                        <IoIosArrowBack />
                    </button>)}
                    <div className="font-bold mx-auto text-2xl">{settingText}</div>
                    <button
                        onClick={handleClick}
                        className=""
                    >
                        <FaTimes />
                    </button>
                </div>
                {renderContent()}

            </div>
            <p className="absolute bottom-[5vw] -left-[3vw] text-snow-300 text-[20vw] items-end font-bold opacity-50">
                {settingText}
            </p>
        </div>
    );
}
