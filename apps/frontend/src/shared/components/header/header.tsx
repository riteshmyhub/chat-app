import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { AvatarProfile } from "..";

type Props = {
   title: string;
   description?: JSX.Element;
   back?: any;
   avatar?: string;
   extra?: JSX.Element;
   event?: Function;
   showAvatar?: boolean;
   prefixItem?: JSX.Element;
};

export function Header({ avatar, title, description, extra, event, back, showAvatar, prefixItem }: Props) {
   const navigate = useNavigate();
   return (
      <>
         <div className="flex justify-between items-center border-b min-h-[65px] p-2">
            <div className="flex items-center gap-3">
               {prefixItem && prefixItem}
               {back && ( //
                  <ArrowLeftIcon role="button" className="size-7" onClick={() => navigate(back, { replace: true })} />
               )}
               {showAvatar && (
                  <AvatarProfile //
                     src={avatar}
                     fallBackTxt={title}
                     height="60px"
                     width="60px"
                  />
               )}
               <div>
                  <button onClick={() => event && event()}>
                     <b className="text-lg">{title}</b>
                  </button>
                  {description && description}
               </div>
            </div>
            {extra && <div>{extra}</div>}
         </div>
      </>
   );
}
