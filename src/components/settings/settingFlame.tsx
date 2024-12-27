import { useAtom, useAtomValue } from 'jotai';
import { handleState, settingType } from '@/globalStateAtoms/atoms';
import SettingMain from './settingMain';
import { FaTimes } from 'react-icons/fa';


export default function Setting() {
    const [isHandleModal, setHandleModal] = useAtom(handleState);
    const settingText = useAtomValue(settingType);
    // ボタン（アイコン）クリック時のトグル処理
    const handleClick = () => setHandleModal(isHandleModal === 'close' ? 'open' : 'close');

    return (
        <div
            className="fixed font-[family-name:var(--font-geist-sans)] inset-0 flex items-center justify-center bg-black bg-opacity-70"
            onClick={handleClick} // 背景クリックイベントを防止
        >
            <p className=' absolute bottom-[5vw] -left-[3vw] text-white text-[20vw] items-end font-bold opacity-50'>
                {settingText}
            </p>
            <SettingMain />
            <button
                onClick={handleClick} // ボタンのみでクリックを処理
                className="absolute right-8 top-8"
            >
                <FaTimes />
            </button>

        </div>

    );
}
