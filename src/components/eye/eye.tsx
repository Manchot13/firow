import { eyeModalSwitch } from "@/globalStateAtoms/atoms";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from 'react'

export function Eye() {
    const [isEyeOn, setEyeOn] = useAtom(eyeModalSwitch);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 180 }
        })
            .then(stream => {
                const video = videoRef.current; // `let`から`const`に変更
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <>
            <div
                className="fixed inset-0 flex items-center justify-center tracking-wider backdrop-blur-sm bg-black bg-opacity-80 text-snow-700"
                onClick={() => setEyeOn(!isEyeOn)}
            >
                <div 
                    className="p-5 absolute w-[80%] h-[20vh] min-w-72 rounded-xl shadow-xl flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <video 
                        className="w-full h-full object-cover" 
                        ref={videoRef}
                    ></video>
                </div>
            </div>
        </>
    );
}
