import { useMediaQuery } from "@/shared/hooks";
import { XIcon } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
   children: Readonly<React.ReactNode>;
   aside: JSX.Element;
   position: "left" | "right";
};

export const AsideMenu = forwardRef(({ children, position, aside }: Props, ref) => {
   const [toggle, setToggle] = useState(false);
   const screen = useMediaQuery();
   useImperativeHandle(ref, () => ({ setToggle }), []);

   return (
      <>
         <aside
            style={{
               transform: toggle ? "translateX(0)" : position === "left" ? "translateX(-100%)" : "translateX(100%)",
               transition: "transform 150ms ease-in-out, opacity 150ms ease-in-out", // Speed increased to 150ms
               opacity: toggle ? 1 : 0,
               minWidth: screen.md ? "400px" : "100%",
               position: "fixed",
               [position]: 0,
               top: 0,
            }}
            className={`border overflow-x-hidden bg-white h-full z-40`}>
            {/* Close Button */}
            <button onClick={() => setToggle(!toggle)} className="absolute top-3 right-3">
               <XIcon size={20} className="text-red-600" />
            </button>
            {aside}
         </aside>

         <main
            className="flex flex-col h-full" 
            style={{
               transition: `margin-${position} 120ms ease-in-out`, // Speed increased to 150ms
               [position === "left" ? "marginLeft" : "marginRight"]: toggle ? (screen.md ? "400px" : "100%") : "0px",
            }}>
            {/* Main Content */}
            {children}
         </main>
      </>
   );
});
