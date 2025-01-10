type SwitchButtonProps = {
    isOn: boolean;
    onToggle: () => void;
};

export default function SwitchButton({ isOn, onToggle }: SwitchButtonProps) {
    return (
        <button
            onClick={onToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all 
                ${isOn ? "bg-trinidad-500" : "bg-gray-400"}`}
        >
            <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform 
                    ${isOn ? "translate-x-6" : "translate-x-0"}`}
            ></div>
        </button>
    );
}