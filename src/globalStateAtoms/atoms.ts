import { atom } from 'jotai';

// 他の atoms
export const handleState = atom('close');
export const clockSwitch = atom(false);
export const toDoSwitch = atom(false);
export const pomodoroSwitch = atom(false);
export const breathSwitch = atom(false);
export const settingType = atom("Setting");
export const timeAtom = atom(new Date());
export const todoName = atom("");
type Task = {
    id: number;
    name: string;
};
export const todolist = atom<Task[]>([]);
