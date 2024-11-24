import "react-image-gallery/styles/css/image-gallery.css";
import "./media-viewer.css";
import ImageGallery from "react-image-gallery";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/ui/alert-dialog";
import { XIcon } from "lucide-react";
import { IAttachment } from "@/types/chat.type";
import { useState } from "react";

export function MediaViewer({ mediaList }: { mediaList: IAttachment[] }) {
   const [activeSlide, setActiveSlide] = useState(0);
   return (
      <AlertDialog>
         <div className="grid grid-cols-2 gap-2">
            {mediaList.map((media, idx) => {
               let src = null;
               switch (true) {
                  case media.type.includes("image"):
                     src = media?.src;
                     break;
                  case media.type.includes("audio"):
                     src = "/images/audio.png";
                     break;
                  case media.type.includes("video"):
                     src = "/images/video.png";
                     break;
                  case media.type.includes("pdf"):
                  default:
                     src = "/images/file.png";
                     break;
               }
               return (
                  <AlertDialogTrigger className="bg-white rounded-md" onClick={() => setActiveSlide(idx)}>
                     <img //
                        src={src}
                        alt={media.name}
                        className="w-48 h-28 object-contain p-3"
                     />
                     <span className="text-xs text-black">{media.name}</span>
                  </AlertDialogTrigger>
               );
            })}
         </div>
         <AlertDialogContent className="p-0 block w-full max-w-screen-xl border-none rounded-none">
            <AlertDialogTrigger className=" absolute top-8 right-8 z-30" onClick={() => setActiveSlide(0)}>
               <XIcon size={30} className="text-red-600" />
            </AlertDialogTrigger>
            <ImageGallery
               showNav={false}
               showPlayButton={false}
               autoPlay={false}
               lazyLoad
               startIndex={activeSlide}
               items={(mediaList as any)?.map((attachment: IAttachment) => {
                  switch (true) {
                     case attachment.type.includes("image"):
                        return {
                           thumbnail: attachment?.src,
                           original: attachment?.src,
                           renderItem: () => (
                              <img //
                                 src={attachment.src}
                                 className="w-full h-[80vh] object-contain mx-auto"
                              />
                           ),
                        };
                     case attachment.type.includes("audio"):
                        return {
                           thumbnail: "/images/audio.png",
                           original: "/images/audio.png",
                           renderItem: () => (
                              <div className="h-[80vh] flex items-center justify-center">
                                 <div className="h-[300px]">
                                    <AudioPlayer //
                                       attachment={attachment}
                                    />
                                 </div>
                              </div>
                           ),
                        };
                     case attachment.type.includes("video"):
                        return {
                           thumbnail: "/images/video.png",
                           original: "/images/video.png",
                           renderItem: () => (
                              <video //
                                 src={attachment?.src}
                                 controls
                                 className="w-full h-[80vh]"
                              />
                           ),
                        };
                     case attachment.type.includes("pdf"):
                        return {
                           thumbnail: "/images/pdf.png",
                           original: "/images/pdf.png",
                           renderItem: () => (
                              <iframe //
                                 src={attachment.src}
                                 className="w-full  h-[80vh]"
                              />
                           ),
                        };
                     default:
                        return {};
                  }
               })}
            />
         </AlertDialogContent>
      </AlertDialog>
   );
}
/*
({
                  thumbnail: attachment?.src,
                  original: attachment?.src,
                  renderItem: () => {
                     switch (true) {
                        case attachment.type.includes("image"):
                           return <img src={attachment.src} className="w-full h-[80vh] object-cover mx-auto" />;
                        case attachment.type.includes("video"):
                           return <video src={attachment.src} controls className="w-full h-[80vh]" />;
                        case attachment.type.includes("audio"):
                           return (
                              <div className="h-[80vh] flex items-center justify-center">
                                 <div className="h-[300px]">
                                    <AudioPlayer //
                                       attachment={attachment}
                                    />
                                 </div>
                              </div>
                           );
                        case attachment.type.includes("pdf"):
                           return <iframe src={attachment.src} className="w-full  h-[80vh]" />;
                        default:
                           return "";
                     }
                  },
               })

*/
