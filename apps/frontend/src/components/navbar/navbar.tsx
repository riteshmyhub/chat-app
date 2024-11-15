import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
   title: JSX.Element;
   description?: JSX.Element;
   back?: any;
   avatar?: string;
   extra?: JSX.Element;
   event?: Function;
};

export function Navbar({ avatar, title, description, extra, event, back }: Props) {
   const navigate = useNavigate();
   return (
      <>
         <div className="flex justify-between items-center border-b min-h-[65px] p-2">
            <div className="flex items-center gap-3">
               {back && ( //
                  <ArrowLeftIcon role="button" className="size-6" onClick={() => navigate(back, { replace: true })} />
               )}
               {avatar && ( //
                  <div>
                     <img src={avatar} alt="avatar" className="block rounded-full h-[60px] w-[60px] object-cover mx-auto border" />
                  </div>
               )}
               <div>
                  <button onClick={() => event && event()}>{title}</button>
                  {description && description}
               </div>
            </div>
            {extra && <div>{extra}</div>}
         </div>
      </>
   );
}
