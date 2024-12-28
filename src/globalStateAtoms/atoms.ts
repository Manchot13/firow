import { atom } from 'jotai';

// 他の atoms
export const handleState = atom('close');
export const clockSwitch = atom(false);
export const toDoSwitch = atom(false);
export const settingType = atom("Setting");
<<<<<<< HEAD
export const timeAtom = atom(new Date());
=======
export const todoName = atom("");
type Task = {
    id: number;
    name: string;
};
export const todolist = atom<Task[]>([]);
>>>>>>> dd94e242f49bd5b24c7c67f6403ef850acd072c6

// 書き込み用 atom
export const writeSettingType = atom(
    null,
    (get, set, text: string) => {
        set(settingType, text);
    }
<<<<<<< HEAD
);
=======
)
>>>>>>> dd94e242f49bd5b24c7c67f6403ef850acd072c6
