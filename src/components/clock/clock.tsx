import { useTime } from "./hooks/useTime";

export default function Clock() {
    const time = useTime();

    return <div>{time.toLocaleTimeString()}</div>;
}
