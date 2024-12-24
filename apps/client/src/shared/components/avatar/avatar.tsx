import React, { useCallback, useEffect, useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
   isOnline?: boolean;
   alt: string;
   src?: string;
   size: string;
}

export function Avatar({ isOnline, alt, src, size, ...res }: Props) {
   const [hasError, setHasError] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const onError = useCallback(() => {
      console.log("...");
      setHasError(true);
   }, []);

   const onLoad = useCallback(() => {
      setIsLoading(false);
   }, []);

   useEffect(() => {
      // Reset error state when src changes
      setHasError(false);
      setIsLoading(true);
   }, [src]);

   return (
      <span {...(isOnline ? { "data-online": true } : {})}>
         {!hasError && src ? (
            <img {...res} src={isLoading ? "/images/loading-avatar.jpg" : src} alt={alt} width={size} height={size} onLoad={onLoad} onError={onError} />
         ) : (
            <span className="inline-flex bg-gray-100 justify-center items-center rounded-full text-lg font-medium text-gray-600 uppercase" style={{ height: size, width: size }}>
               {alt?.split(" ")[0]?.[0]}
               {alt?.split(" ")[1]?.[0]}
            </span>
         )}
      </span>
   );
}
