import { useState, useEffect } from "react";

function baseQuery(query: string) {
   if (typeof window !== "undefined") {
      if (window?.matchMedia) {
         return window.matchMedia(query).matches;
      } else {
         return false;
      }
   }
}

export type BreakPoint = {
   xs: boolean | undefined;
   sm: boolean | undefined;
   md: boolean | undefined;
   lg: boolean | undefined;
   xl: boolean | undefined;
   custom?: boolean | undefined;
};

export function useMediaQuery(customQueries?: string) {
   const [mediaQueries, setMediaQueries] = useState<BreakPoint>({
      ...(customQueries ? { custom: baseQuery(customQueries) } : {}),
      xs: baseQuery(`(min-width: 200px)`),
      sm: baseQuery(`(min-width: 576px)`),
      md: baseQuery(`(min-width: 768px)`),
      lg: baseQuery(`(min-width: 992px)`),
      xl: baseQuery(`(min-width: 1200px)`),
   });

   useEffect(() => {
      function handleResize() {
         setMediaQueries({
            ...(customQueries ? { custom: baseQuery(customQueries) } : {}),
            xs: baseQuery(`(min-width: 200px)`),
            sm: baseQuery(`(min-width: 576px)`),
            md: baseQuery(`(min-width: 768px)`),
            lg: baseQuery(`(min-width: 992px)`),
            xl: baseQuery(`(min-width: 1200px)`),
         });
      }

      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return mediaQueries;
}
/* 
  how to use : 
  const { xs, sm, md, lg, xl } = useMediaQuery()
  const { xs, sm, md, lg, xl, custom } = useMediaQuery("(max-width: 900px)")
*/
