import { useTime } from "./hooks/useTime";
import { useMemo } from 'react';

export default function Clock() {
    const currentTime = useTime();

    const formattedTimeParts = useMemo(() => {
        const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        const formattedParts = new Intl.DateTimeFormat('ja-JP', dateTimeFormatOptions).formatToParts(currentTime);

        let formattedTimeWithoutSeconds = "";
        let formattedSeconds = "";
        let hasFirstLiteralAppended = false; // 最初のliteralを追加したかどうかのフラグ

        for (const part of formattedParts) {
            if (part.type === 'hour' || part.type === 'minute') {
                formattedTimeWithoutSeconds += part.value;
            } else if (part.type === 'literal' && !hasFirstLiteralAppended) { // 最初のliteralのみ追加
                formattedTimeWithoutSeconds += part.value;
                hasFirstLiteralAppended = true; // フラグをtrueに
            } else if (part.type === 'second') {
                formattedSeconds = part.value;
            }
        }

        return { formattedTimeWithoutSeconds, formattedSeconds };
    }, [currentTime]);

    return (
        <div className="text-[8vw] flex items-baseline md:text-[12vw] md:tracking-[2vw]">
            <div className="pr-4">
                {formattedTimeParts.formattedTimeWithoutSeconds}
            </div>
            <div className="text-[4vw] md:text-[8vw]">
                {formattedTimeParts.formattedSeconds}
            </div>
        </div>
    );
}