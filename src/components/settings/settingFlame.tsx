import { useAtom } from 'jotai';
import { handleState, settingType } from '@/globalStateAtoms/atoms';
import SettingMain from './settingMain';
import { FaTimes } from 'react-icons/fa';
import SettingBreathe from './settingBreathe';
import SettingPomodoro from './settingPomorodo';
import { useEffect, useState } from 'react';
import SettingSource from './settingSource';
import SettingAdvance from './settingAdvance';

export default function Setting() {
    const [isHandleModal, setHandleModal] = useAtom(handleState);
    const [settingText, setSettingType] = useAtom(settingType);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true); // クライアントサイドでのみ実行
    }, []);

    if (!hydrated) return null; // サーバーでの初期レンダリングを防止

    const handleClick = () => {
        setSettingType("Setting");
        setHandleModal(isHandleModal === 'close' ? 'open' : 'close');
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
            {renderContent()}
            <button
                onClick={handleClick}
                className="absolute right-8 top-8"
            >
                <FaTimes />
            </button>
        </div>
    );
}
