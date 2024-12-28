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
    <div className="relative flex min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="h-full min-h-screen w-full relative">
        <div className='relative min-h-screen flex justify-center items-center h-full w-full'>
          <div className="relative h-[50vh] aspect-square -z-10">
            <Image
              src="/fire.gif"
              alt="shishiodoshi picture"
              fill
              sizes="20vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          {isClockOn === true && (
              <ClockModal />
            )}
        </div>
        <div>
          {isToDoOn === true && (
            <TodoModal />
          )}
        </div>
        <div className="absolute right-6 top-6 text-2xl" onClick={handleClick} >
          <RiSettings3Line className='text-4xl' />
          {isHandleModal === 'open' && (
            <SettingFlame />
          )}
        </div>
      </main>
    </div>
  );
}
