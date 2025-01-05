import { atom } from 'jotai';

// 他の atoms
export const handleState = atom('close');
export const clockSwitch = atom(false);
export const toDoSwitch = atom(false);
export const pomodoroSwitch = atom(false);
export const BreatheSwitch = atom(false);
export const settingType = atom("Setting");
export const timeAtom = atom(new Date());
export const todoName = atom("");
export const isClockSecondAtom = atom(false);
export const angleAtom = atom(0);
export const isDraggingAtom = atom(false);
export const pomodoroTimeAtom = atom(0);
type Task = {
    id: number;
    name: string;
};
export const todolist = atom<Task[]>([]);
