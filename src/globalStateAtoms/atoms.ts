import { atom } from 'jotai';

// 他の atoms
export const handleState = atom('close');
export const clockSwitch = atom(false);
export const toDoSwitch = atom(false);
export const settingType = atom("Setting");
export const timeAtom = atom(new Date());
export const todoName = atom("");
export const isClockSecondAtom = atom(false);
type Task = {
    id: number;
    name: string;
};
export const todolist = atom<Task[]>([]);

// 書き込み用 atom
export const writeSettingType = atom(
    null,
    (get, set, text: string) => {
        set(settingType, text);
    }
);
