// atoms.js
import { atom } from 'jotai';

export const handleState = atom('close');

export const clockSwitch = atom(false);
export const toDoSwitch = atom(false);
export const settingType = atom("Setting");
export const todoName = atom("");
type Task = {
    id: number;
    name: string;
};
export const todolist = atom<Task[]>([]);

export const writeSettingType = atom(
    null,
    (get, set, text: string) => {
      set(settingType, text);
    }
)
