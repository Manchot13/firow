import { todoName, todolist } from "@/globalStateAtoms/atoms";
import { useAtom } from "jotai";

let nextId = 1; // グローバルスコープでIDカウンターを定義

export default function TodoModal() {
    const [name, setName] = useAtom(todoName);
    const [list, setList] = useAtom(todolist);

    return (
        <div className="bg-gray-400 rounded-lg">
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter a task name"
                className="bg-red-400 p-5 rounded-lg"
            />
            <button
                onClick={() => {
                    // 新しいタスクを配列に追加
                    setList([...list, { id: nextId++, name }]);
                    setName(""); // 入力フィールドをクリア
                }}
            >
                Add
            </button>
            <ul>
                {list.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}
