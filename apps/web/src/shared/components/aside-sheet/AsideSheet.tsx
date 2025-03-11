import { useMediaQuery } from "@/shared/hooks";
import { SheetContent } from "@/shared/ui/sheet";
import React from "react";

type Props = Readonly<{ children: React.ReactNode }>;

export function AsideSheet({ children }: Props) {
   const { custom: isSm } = useMediaQuery("(max-width: 776px)");
   if (isSm) {
      return (
         <SheetContent side="left" className="flex flex-col p-0">
            {children}
         </SheetContent>
      );
   } else {
      return <React.Fragment>{children}</React.Fragment>;
   }
}
