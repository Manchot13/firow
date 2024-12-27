"use client";

import { useAtom } from 'jotai';
import Image from "next/image";
import { RiSettings3Line } from "react-icons/ri";
import SettingFlame from "@/components/settings/settingFlame";

import { handleState, clockSwitch, toDoSwitch } from '@/globalStateAtoms/atoms';

export default function Home() {
  const [isHandleModal, setHandleModal] = useAtom(handleState);
  const [isClockOn, setIsClockOn] = useAtom(clockSwitch);
  const [isToDoOn, setIsToDoOn] = useAtom(toDoSwitch);
  const handleClick = () => setHandleModal(isHandleModal === 'close' ? 'open' : 'close');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="h-[40%] aspect-video">
          <Image
            src="/shishiodoshi.png"
            alt="shishiodoshi picture"
            fill
            objectFit="contain"
            priority
          />
        </div>
        <div>
          {isToDoOn === true && (
            <todoModal />
          )}
          {isClockOn === true && (
            <clockModal />
          )}
        </div>
        <div className="absolute right-8 top-8 text-2xl" onClick={handleClick} >
          <RiSettings3Line />
          {isHandleModal === 'open' && (
            <SettingFlame />
          )}
        </div>
      </main>
    </div>
  );
}
