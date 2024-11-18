import { Sheet, SheetContent } from "@/ui/sheet";
import { XIcon } from "lucide-react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type Props = {
   children: ReactNode;
   heading: string;
   className?: string;
};
export const BottomSheet = forwardRef(({ children, heading, className }: Props, ref) => {
   const [isOpen, setToggle] = useState(false);

   useImperativeHandle(ref, () => ({ setToggle }), []);

   return (
      <Sheet open={isOpen}>
         <SheetContent //
            side="bottom"
            className={`h-screen md:w-[50%] mx-auto p-0 ${className}`}
            onOpenAutoFocus={(e) => e.preventDefault()}>
            {heading && (
               <div className="flex justify-between mb-3">
                  <h1 className="text-xl capitalize font-medium">{heading}</h1>
                  <XIcon onClick={() => setToggle(false)} className="cursor-pointer" />
               </div>
            )}
            <div>{children}</div>
         </SheetContent>
      </Sheet>
   );
});
