import { useAtom } from 'jotai';
import { handleState, settingType } from '@/globalStateAtoms/atoms';
import SettingMain from './settingMain';
import { FaTimes } from 'react-icons/fa';
import SettingBreathe from './settingBreathe';
import SettingPomodoro from './settingPomorodo';
import { useEffect } from 'react';
import SettingSource from './settingSource';
import SettingAdvance from './settingAdvance';
import SettingDrumRoll from './settingDrumRoll';
import { IoIosArrowBack } from 'react-icons/io';

export default function SettingFlame() {
    const [isHandleModal, setHandleModal] = useAtom(handleState);
    const [settingText, setSettingType] = useAtom(settingType);
   
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
            case 'Drum_Roll':
                return <SettingDrumRoll startTime={1} endTime={30} timeInterval={4} />;
            default:
                return <SettingMain />;
        }
    };

    return (
        <div
            className="fixed font-[family-name:var(--font-geist-sans)] inset-0 flex items-center justify-center tracking-wider bg-black bg-opacity-70 text-snow-700"
            onClick={handleClick}
        >
            <p className="absolute bottom-[5vw] -left-[3vw] text-white text-[20vw] items-end font-bold opacity-50">
                {settingText}
            </p>
            <div className="bg-gray-200 p-5 absolute right-5 top-5 w-[15%] min-w-72 rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()} // 子要素クリックで背景イベントを止める
            // 子要素クリックで背景イベントを止める
            >
                <div className='flex mb-4'>
                    {settingText != "Setting"&& (<button
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
        </div>
    );
}
