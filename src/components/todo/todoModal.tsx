import React, { useState } from "react";
import { todoName, todolist } from "@/globalStateAtoms/atoms";
import { useAtom } from "jotai";
import { FaRegCircle, FaTasks, FaTimes } from "react-icons/fa";

let nextId = 1; // グローバルスコープでIDカウンターを定義

export default function TodoModal() {
    const [name, setName] = useAtom(todoName);
    const [list, setList] = useAtom(todolist);
    const [isEmpty, setIsEmpty] = useState(false); // タスクリストが空かどうかを管理
    const [isComposing, setIsComposing] = useState(false); // 変換中の状態を管理

    const addTask = () => {
        if (name !== "" && !list.some(item => item.name === name)) {
            setList([...list, { id: nextId++, name }]);
            setName(""); // 入力フィールドをクリア
            setIsEmpty(false); // タスクリストが空でないことを設定
        }
    };

    const removeTask = (id: number) => {
        const updatedList = list.filter(item => item.id !== id);
        setList(updatedList);
        // タスクリストが空になった場合に状態を更新
        if (updatedList.length === 0) {
            setIsEmpty(true);
        }
    };

    return (
        <div className="absolute top-10 left-10 tracking-widest">
            <div className="flex items-end gap-4 text-3xl font-bold">
                <div className="flex items-center gap-4">
                    <FaTasks className="text-2xl" />
                    <p>Task List</p>
                </div>
                <div className="text-xl">{list.length} tasks</div>
            </div>
            <div className="flex gap-4 border-b border-gray-300">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a task name"
                    className="p-2 w-full focus:outline-none transition"
                    onCompositionStart={() => setIsComposing(true)} // 変換開始
                    onCompositionEnd={() => setIsComposing(false)}   // 変換確定
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !isComposing) {
                            addTask();
                        }
                    }}
                />
                <button
                    onClick={addTask}
                    className="p-2 hover:bg-gray-100 transition"
                >
                    <FaTimes />
                </button>
            </div>
            <ul>
                {list.map((item) => (
                    <li key={item.id} className="my-4 flex items-center gap-4">
                        <button
                            onClick={() => removeTask(item.id)}
                            className="hover:text-red-500 transition"
                        >
                            <FaRegCircle />
                        </button>
                        {item.name}
                    </li>
                ))}
            </ul>
            {isEmpty && (
                <div className="mt-4 text-center animate-fadeIn">
                    <p className="text-gray-500 text-xl">No tasks available!🎉</p>
                </div>
            )}
        </div>
    );
}
