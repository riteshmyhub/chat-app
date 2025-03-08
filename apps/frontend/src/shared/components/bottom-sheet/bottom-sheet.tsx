import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { XIcon } from "lucide-react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type Props = {
   children: ReactNode;
   heading: string;
   className?: string;
   scrollable?:boolean;
};
export const BottomSheet = forwardRef(({ children, heading, scrollable, className }: Props, ref) => {
   const [isOpen, setToggle] = useState(false);
const scroll = scrollable ?`overflow-y-auto max-h-[calc(100vh-4rem)] ${className}`:""
   useImperativeHandle(ref, () => ({ setToggle }), []);

   return (
      <Sheet open={isOpen}>
         <SheetContent //
            side="bottom"
            className={`h-screen md:w-[50%] mx-auto p-0`}
            onOpenAutoFocus={(e) => e.preventDefault()}>
            {heading && (
               <div className="flex justify-between p-3">
                  <h1 className="text-xl capitalize font-medium">{heading}</h1>
                  <XIcon onClick={() => setToggle(false)} className="cursor-pointer" />
               </div>
            )}
            {/* Scrollable content */}
            <div className={scroll}>
               {children}
            </div>
         </SheetContent>
      </Sheet>
   );
});
