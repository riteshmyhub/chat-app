import { IAttachment } from "@/api/types/chat.type";
import { PauseIcon, PlayIcon } from "lucide-react";
import React, { useRef, useState } from "react";

type Props = {
   attachment: IAttachment;
};

export function AudioPlayer({ attachment }: Props) {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const audioRef = useRef<HTMLAudioElement | null>(null);

   const togglePlayPause = () => {
      if (isPlaying) {
         audioRef.current?.pause();
      } else {
         audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
   };

   const handleTimeUpdate = () => {
      if (audioRef.current) {
         setCurrentTime(audioRef.current.currentTime);
         if (audioRef.current.currentTime >= audioRef.current.duration) {
            setIsPlaying(false);
         }
      }
   };

   const handleLoadedMetadata = () => {
      if (audioRef.current) {
         setDuration(audioRef.current.duration);
      }
   };

   const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current) {
         audioRef.current.currentTime = Number(event.target.value);
         setCurrentTime(audioRef.current.currentTime);
      }
   };

   const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60)
         .toString()
         .padStart(2, "0");
      return `${minutes}:${seconds}`;
   };

   return (
      <div className="p-2">
         <audio ref={audioRef} src={attachment?.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} />
         <img src="/images/audio.png" alt="audio" height={70} width={70} className="mx-auto" />
         <span className="text-center block my-3 text-xs">{attachment.name}</span>
         <div className="flex items-center gap-4">
            <button //
               onClick={togglePlayPause}>
               {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
            </button>
            <span className="text-xs">{formatTime(currentTime)}</span>
            <input //
               type="range"
               min="0"
               max={duration.toString()}
               value={currentTime.toString()}
               onChange={handleSeek}
               className="w-full h-1"
            />
            <span className="text-xs">{formatTime(duration)}</span>
         </div>
      </div>
   );
}
