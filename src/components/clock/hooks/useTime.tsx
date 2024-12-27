import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { timeAtom } from '@/globalStateAtoms/atoms';

export function useTime() {
    const [time, setTime] = useAtom(timeAtom);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId); // コンポーネントのアンマウント時にクリーンアップ
    }, [setTime]);

    return time; // 現在の時間を返す
}
