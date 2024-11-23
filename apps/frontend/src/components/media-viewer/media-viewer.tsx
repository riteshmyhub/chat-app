import "react-image-gallery/styles/css/image-gallery.css";
import "./media-viewer.css";
import ImageGallery from "react-image-gallery";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/ui/alert-dialog";
import { XIcon } from "lucide-react";

const list = [
   {
      dataSrc: "https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80",
      imgSrc: "https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
      fileType: "image",
   },
   {
      dataSrc: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      imgSrc: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
      fileType: "image",
   },
   {
      dataSrc: "https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      imgSrc: "https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80",
      fileType: "image",
   },
   {
      dataSrc: "https://www.lightgalleryjs.com/pdf/sample.pdf",
      imgSrc: "/images/pdf.png",
      fileType: "pdf",
   },
   {
      dataSrc: "https://www.example.com/audio/sample.mp3",
      imgSrc: "/images/audio.png",
      fileType: "audio",
   },
   {
      dataSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
      imgSrc: "/images/video.png",
      fileType: "video",
   },
];
export function MediaViewer() {
   return (
      <AlertDialog>
         <AlertDialogTrigger>Open</AlertDialogTrigger>
         <AlertDialogContent className="p-0 block w-full max-w-screen-xl border-none rounded-none">
            <AlertDialogTrigger className=" absolute top-8 right-8 z-30">
               <XIcon size={30} className="text-red-600" />
            </AlertDialogTrigger>
            <ImageGallery
               showNav={false}
               showPlayButton={false}
               autoPlay={false}
               lazyLoad
               items={list.map((data) => ({
                  thumbnail: data.imgSrc,
                  original: data.imgSrc,
                  renderItem: () => {
                     switch (data.fileType) {
                        case "image":
                           return <img src={data.dataSrc} className="w-full h-[80vh] object-cover mx-auto" />;
                        case "video":
                           return <video src={data.dataSrc} controls className="w-full h-[80vh]" />;
                        case "audio":
                           return (
                              <div className="h-[80vh] flex items-center justify-center">
                                 <div className="h-[300px]">
                                    <AudioPlayer //
                                       attachment={{ name: "test", src: data?.dataSrc, size: 12234, type: "cxv" }}
                                    />
                                 </div>
                              </div>
                           );
                        case "pdf":
                           return <iframe src={data?.dataSrc} className="w-full  h-[80vh]" />;
                        default:
                           return "";
                     }
                  },
               }))}
            />
         </AlertDialogContent>
      </AlertDialog>
   );
}
