import React, { useCallback, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
   src?: string; // Optional source of the image
   noImg?: string; // Fallback image if the main image is not available
   asAvatar?: boolean;
}

export const Image: React.FC<ImageProps> = (props) => {
   const [isLoading, setIsLoading] = useState(true);
   const { src, noImg, asAvatar, ...rest } = props;

   const fallbackImg = asAvatar ? "/images/user-placeholder.png" : noImg || "/images/image-not-found.webp";

   const onError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
         e.currentTarget.src = fallbackImg;
      },
      [noImg]
   );

   const onLoad = useCallback(() => {
      setIsLoading(false);
   }, []);

   return (
      <img //
         {...(isLoading ? { src: "/images/blur-image.webp" } : { src: src || fallbackImg })}
         {...rest}
         loading="lazy"
         onError={onError}
         onLoad={onLoad}
      />
   );
};
