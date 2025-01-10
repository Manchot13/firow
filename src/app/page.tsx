"use client";

import styles from "./index.module.css";
import { useAtom, useAtomValue } from 'jotai';
import Image from "next/image";
import { RiSettings3Line } from "react-icons/ri";
import SettingFlame from "@/components/settings/settingFlame";
import TodoModal from "@/components/todo/todoModal";
import ClockModal from "@/components/clock/clockModal";
import { handleState, clockSwitch, toDoSwitch, breatheModalSwitch, fontType, pomodoroModalSwitch } from '@/globalStateAtoms/atoms';
import Breathe from "@/components/breathe/breathe";
import React from 'react'; // Reactをインポート
import PomodoroModal from "@/components/pomodoro/pomodoroModal";
import { CgTimer } from "react-icons/cg";
import { LuLeaf } from "react-icons/lu";
import PageFunction from "@/components/pageFunction";

export default function Home() {
  const [isHandleModal, setHandleModal] = useAtom(handleState);
  const isClockOn = useAtomValue(clockSwitch);
  const isToDoOn = useAtomValue(toDoSwitch);
  const [isBreatheOn, setBreatheOn] = useAtom(breatheModalSwitch);
  const [isPomodoroOn, setPomodoroOn] = useAtom(pomodoroModalSwitch);
  const handleClick = () => setHandleModal(isHandleModal === 'close' ? 'open' : 'close');
  const isFontType = useAtomValue(fontType);

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
      <div className={`relative flex min-h-screen bg-snow-100 font-[family-name:var(--font-geist-sans)] tracking-[1em] ${isFontType === "JaPixel"? styles.DotGothic16 : isFontType === "EnPixel"? styles.cofoSansPixel: ""}`}>
        <main className="h-full min-h-screen w-full relative">
          <div className='relative min-h-screen flex justify-center items-center h-full w-full lg:flex-col'>
            <div className="relative h-[50vh] aspect-square lg:h-[20vh]">
              <Image
                src="/fire.gif"
                alt="shishiodoshi picture"
                fill
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
          <div className="absolute right-6 top-4 text-2xl flex md:flex-col-reverse md:items-end md:right-2">
            <div className='flex justify-center tracking-wider gap-[10%] mr-4 md:hidden'>
              <div className=" cursor-pointer rounded-md flex justify-center hover:bg-snow-200 w-fit h-full md:pr-0" onClick={() => (setPomodoroOn(!isPomodoroOn))}>
                <PageFunction title="Pomodoro" icon={<CgTimer />} />
              </div>
              <div className=" cursor-pointer rounded-md flex justify-center hover:bg-snow-200 w-full h-full md:pr-0"  onClick={() => (setBreatheOn(!isBreatheOn))}>
                <PageFunction title="Breathe" icon={<LuLeaf />} />
              </div>
            </div>
            <div onClick={handleClick} className="md:mr-4 md:mb-4">
              <RiSettings3Line className='text-4xl m-2 transition-transform duration-300 ease-in-out hover:rotate-180' />
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
