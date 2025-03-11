import { useEffect, useState } from "react";

type Props = {
   sec?: number;
   callback?: () => void;
};

export function DigitalTimer({ sec, callback }: Props) {
   const [timer, setTimer] = useState<number>(sec || 120);
   const milliseconds = timer * 1000;

   const seconds = Math.floor((milliseconds / 1000) % 60);

   const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

   const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

   const formattedTime = [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0")].join(":");

   useEffect(() => {
      let tiktik = setTimeout(() => {
         setTimer(timer - 1);
      }, 1000);
      if (timer === 0) {
         clearTimeout(tiktik);
         callback && callback();
      }
      return () => {
         clearTimeout(tiktik);
      };
   }, [timer]);

   return <span>{formattedTime}</span>;
}