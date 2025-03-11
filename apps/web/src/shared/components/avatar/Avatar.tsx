import { Avatar as AvatarUi, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
type Props = {
   src?: string;
   fallBackTxt: string;
   height?: string;
   width?: string;
   isOnline?: boolean;
};
export function Avatar({ src, fallBackTxt, width = "50px", height = "50px", isOnline }: Props) {
   const txt = fallBackTxt?.split(" ");
   return (
      <AvatarUi className="h-[50px] w-[50px] relative inline-block overflow-visible" {...(isOnline ? { "data-online": true } : {})} style={{ height, width }}>
         <AvatarImage src={src} className="rounded-full object-contain bg-gray-200" />
         <AvatarFallback className="uppercase">
            {txt?.[0]?.[0]}
            {txt?.[1]?.[0]}
         </AvatarFallback>
      </AvatarUi>
   );
}
