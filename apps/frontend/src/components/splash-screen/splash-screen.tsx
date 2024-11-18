import { LoaderCircleIcon } from "lucide-react";

export function SplashScreen() {
   return (
      <div className="h-screen flex justify-center items-center">
         <div>
            <img src="/favicon.svg" alt="splash-image" className="my-3 block" width={100} height={100} />
            <LoaderCircleIcon className="spin mx-auto text-gray-600" />
         </div>
      </div>
   );
}
