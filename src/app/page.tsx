"use client";

import { useAtom, useAtomValue } from 'jotai';
import Image from "next/image";
import { RiSettings3Line } from "react-icons/ri";
import SettingFlame from "@/components/settings/settingFlame";
import TodoModal from "@/components/todo/todoModal";
import ClockModal from "@/components/clock/clockModal";

import { handleState, clockSwitch, toDoSwitch } from '@/globalStateAtoms/atoms';

export default function Home() {
  const [isHandleModal, setHandleModal] = useAtom(handleState);
  const isClockOn = useAtomValue(clockSwitch);
  const isToDoOn = useAtomValue(toDoSwitch);
  const handleClick = () => setHandleModal(isHandleModal === 'close' ? 'open' : 'close');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <div className="h-[40%] aspect-video">
            <Image
              src="/shishiodoshi.png"
              alt="shishiodoshi picture"
              fill
              objectFit="contain"
              priority
            />
          </div>
        </div>
        <div>
          {isToDoOn === true && (
            <TodoModal />
          )}
          {isClockOn === true && (
            <ClockModal />
          )}
        </div>
        <div className="absolute right-6 top-6 text-2xl" onClick={handleClick} >
          <RiSettings3Line className='text-4xl transition-transform duration-300 ease-in-out hover:rotate-180' />
          {isHandleModal === 'open' && (
            <SettingFlame />
          )}
        </div>
      </main>
    </div>
  );
}
