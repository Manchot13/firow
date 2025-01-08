"use client";

import styles from "./index.module.css";
import { useAtom, useAtomValue } from 'jotai';
import Image from "next/image";
import { RiSettings3Line } from "react-icons/ri";
import SettingFlame from "@/components/settings/settingFlame";
import TodoModal from "@/components/todo/todoModal";
import ClockModal from "@/components/clock/clockModal";
import { handleState, clockSwitch, toDoSwitch, breatheModalSwitch, pomodoroModalSwitch } from '@/globalStateAtoms/atoms';
import Breathe from "@/components/breathe/breathe";
import React from 'react'; // Reactをインポート
import PomodoroModal from "@/components/pomodoro/pomodoroModal";
import { CgTimer } from "react-icons/cg";
import { LuLeaf } from "react-icons/lu";
import Function from "@/components/settings/function";

export default function Home() {
  const [isHandleModal, setHandleModal] = useAtom(handleState);
  const isClockOn = useAtomValue(clockSwitch);
  const isToDoOn = useAtomValue(toDoSwitch);
  const [isBreatheOn, setBreatheOn] = useAtom(breatheModalSwitch);
  const [isPomodoroOn, setPomodoroOn] = useAtom(pomodoroModalSwitch);
  const handleClick = () => setHandleModal(isHandleModal === 'close' ? 'open' : 'close');
  function ClientOnly({ children, ...delegated }: { children: React.ReactNode }) { // 型を追加
    const [hasMounted, setHasMounted] = React.useState<boolean>(false); // 型を追加
    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) {
      return null;
    }
    return (
      <div {...delegated}>
        {children}
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className={`relative flex min-h-screen font-[family-name:var(--font-geist-sans)] tracking-[1em] ${styles.DotGothic16}`}>
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
            {isPomodoroOn === true && (
              <PomodoroModal />
            )}
          </div>
          <div className="absolute right-6 top-6 text-2xl flex">
            <div className='flex justify-center tracking-wider gap-[10%] mr-4'>
              <div className=" cursor-pointer p-2 rounded-md flex justify-center hover:bg-snow-300 w-fit h-full" onClick={() => (setPomodoroOn(!isPomodoroOn))}>
                <Function title="Pomodoro" icon={<CgTimer />} type='none' />
              </div>
              <div className=" cursor-pointer p-2 rounded-md flex justify-center hover:bg-snow-300 w-full h-full"  onClick={() => (setBreatheOn(!isBreatheOn))}>
                <Function title="Breathe" icon={<LuLeaf />} type='none' />
              </div>
            </div>
            <div onClick={handleClick}>
              <RiSettings3Line className='text-4xl transition-transform duration-300 ease-in-out hover:rotate-180' />
            </div>
            {isHandleModal === 'open' && (
              <SettingFlame />
            )}
          </div>
          {isBreatheOn === true && (
            <Breathe />
          )}
        </main>
      </div>
    </ClientOnly>
  );
}
