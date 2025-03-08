import "react-image-gallery/styles/css/image-gallery.css";
import "./media-viewer.css";
import ImageGallery from "react-image-gallery";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/shared/ui/alert-dialog";
import { ArrowDownToLineIcon,  XIcon } from "lucide-react";
import { useState } from "react";
import { IAttachment } from "@/api/types/chat.type";

export function MediaViewer({ mediaList }: { mediaList: IAttachment[] }) {
   const [activeSlide, setActiveSlide] = useState(0);
   if (!mediaList?.length) {
      return "";
   }

   const gridCols = mediaList?.length > 1 ? "grid-cols-2" : "grid-cols-1";
   return (
      <AlertDialog>
         <div className={`grid ${gridCols} gap-2`}>
            {mediaList?.slice(0, 3).map((media, idx) => {
               let src = null;
               switch (true) {
                  case media.type.includes("image"):
                     src = media.src;
                     break;
                  case media.type.includes("audio"):
                     src = "/images/audio.png";
                     break;
                  case media.type.includes("video"):
                     src = "/images/video.png";
                     break;
                  case media.type.includes("pdf"):
                     src = "/images/pdf.png";
                     break;
                  default:
                     src = "/images/file.png";
               }
               return (
                  <AlertDialogTrigger onClick={() => setActiveSlide(idx)} className="min-w-[150px] h-[80px] bg-white p-2 border">
                     <img
                        src={src} //
                        className="w-full h-full block object-contain"
                     />
                  </AlertDialogTrigger>
               );
            })}
            {mediaList?.length > 3 && ( //
               <AlertDialogTrigger //
                  onClick={() => setActiveSlide(0)}
                  className="min-w-[150px] h-[80px] bg-white flex items-center justify-center text-gray-700
                     text-md border">
                  + {mediaList?.length - mediaList?.slice(0, 3).length} More
               </AlertDialogTrigger>
            )}
         </div>
         <AlertDialogContent className="p-2 block w-full max-w-screen-lg border-none rounded-none bg-white">
            <ImageGallery
               showNav={false}
               showPlayButton={false}
               autoPlay={false}
               lazyLoad
               showFullscreenButton={false}
               startIndex={activeSlide}
               items={(mediaList as any)?.map((attachment: IAttachment) => {
                  const mediaMeta = { thumbnail: "" as any, original: "" as any, component: null as any };

                  switch (true) {
                     case attachment.type.includes("image"):
                        mediaMeta.thumbnail = attachment?.src;
                        mediaMeta.original = attachment?.src;
                        mediaMeta.component = (
                           <img //
                              src={attachment.src}
                              className="block md:h-full mx-auto border w-full object-contain"
                           />
                        );
                        break;
                     case attachment.type.includes("audio"):
                        mediaMeta.thumbnail = "/images/audio.png";
                        mediaMeta.original = "/images/audio.png";
                        mediaMeta.component = (
                           <AudioPlayer //
                              attachment={attachment}
                           />
                        );
                        break;
                     case attachment.type.includes("video"):
                        mediaMeta.thumbnail = "/images/video.png";
                        mediaMeta.original = "/images/video.png";
                        mediaMeta.component = (
                           <video //
                              src={attachment?.src}
                              controls
                              className="w-full h-full"
                           />
                        );
                        break;
                     case attachment.type.includes("pdf"):
                        mediaMeta.thumbnail = "/images/pdf.png";
                        mediaMeta.original = "/images/pdf.png";
                        mediaMeta.component = (
                           <embed //
                              src={attachment.src}
                              type="application/pdf"
                              className="w-full h-full"
                           />
                        );
                        break;
                     default:
                        mediaMeta.thumbnail = "/images/file.png";
                        mediaMeta.original = "/images/file.png";
                        mediaMeta.component = (
                           <div>
                              <img //
                                 src="/images/file.png"
                                 className="block mb-6"
                                 height={160}
                                 width={150}
                              />
                              <span className="block">{attachment.name}</span>
                           </div>
                        );
                        break;
                  }
                  return {
                     thumbnail: mediaMeta?.thumbnail,
                     original: mediaMeta?.original,
                     renderItem: () => (
                        <>
                           <div className="flex items-center justify-between">
                              <p className="font-semibold text-lg">{attachment.name}</p>
                              <div className="flex gap-2">
                                 <a //
                                    href={mediaMeta?.original}
                                    download={attachment.name}>
                                    <ArrowDownToLineIcon //
                                       size={40}
                                       className="text-green-600 rounded-full p-2"
                                    />
                                 </a>
                                 <AlertDialogTrigger onClick={() => setActiveSlide(0)}>
                                    <XIcon size={40} className="text-red-600 bg-white rounded-full p-2" />
                                 </AlertDialogTrigger>
                              </div>
                           </div>
                           <div className="h-[83vh] md:h-[80vh] flex items-center justify-center relative">{mediaMeta?.component}</div>
                        </>
                     ),
                  };
               })}
            />
         </AlertDialogContent>
      </AlertDialog>
   );
}
