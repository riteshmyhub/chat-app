import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Avatar } from "../avatar/avatar";

type Props = {
   title: JSX.Element;
   description?: JSX.Element;
   back?: any;
   avatar?: string;
   extra?: JSX.Element;
   event?: Function;
};

export function Header({ avatar, title, description, extra, event, back }: Props) {
   const navigate = useNavigate();
   return (
      <>
         <div className="flex justify-between items-center border-b min-h-[65px] p-2">
            <div className="flex items-center gap-3">
               {back && ( //
                  <ArrowLeftIcon role="button" className="size-6" onClick={() => navigate(back, { replace: true })} />
               )}
               {avatar && ( //
                  <Avatar src={avatar} className="rounded-full" alt="test user" size="60px" />
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
