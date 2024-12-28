import { todoName, todolist } from "@/globalStateAtoms/atoms";
import { useAtom } from "jotai";
import { FaRegCircle, FaTasks, FaTimes } from "react-icons/fa";

let nextId = 1; // グローバルスコープでIDカウンターを定義

export default function TodoModal() {
    const [name, setName] = useAtom(todoName);
    const [list, setList] = useAtom(todolist);

    return (
        <div className="absolute top-10 left-10">
            <div className="flex items-end gap-4 text-3xl font-bold">
                <div className="flex items-center gap-4">
                    <FaTasks className="text-2xl" />
                    <p>Task List</p>
                </div>
                <div className="text-xl">{list.length}
                    tasks
                </div>
            </div>
            <div className="flex gap-4 border-b border-gray-300">
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter a task name"
                    className="p-2  w-full focus:outline-none transition"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            if (name !== "" && !list.some(item => item.name === name)) {
                                setList([...list, { id: nextId++, name }]);
                                setName(""); // 入力フィールドをクリア
                            }
                        }
                    }}
                />
                <button
                    onClick={() => {
                        // 新しいタスクを配列に追加
                        setName(""); // 入力フィールドをクリア
                    }}>
                    <FaTimes />
                </button>
            </div>
            {/* <button
                onClick={() => {
                    // 新しいタスクを配列に追加
                    setList([...list, { id: nextId++, name }]);
                    setName(""); // 入力フィールドをクリア
                }}
            >
                Add
            </button> */}
            <ul>
                {list.map(item => (
                    <li key={item.id} className="my-4 flex items-center gap-4">
                        <button onClick={() => { setList(list.splice(item.id, 1)) }}>
                            <FaRegCircle />
                        </button>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
