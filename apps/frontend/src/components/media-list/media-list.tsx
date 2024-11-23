import { useAppSelector } from "@/store/store";

export function MediaList() {
   const { mediaList } = useAppSelector((state) => state.chat);
   return (
      <>
         {Boolean(mediaList?.length) && (
            <div className="my-2">
               <div className="flex items-center justify-between">
                  <span className="text-md text-gray-500">Media & Files ({mediaList?.length})</span>
                  {mediaList?.length > 3 && ( //
                     <button //
                        className="text-xs text-blue-600 bg-blue-200 px-4 py-1 flex gap-2 items-center">
                        + {mediaList?.length - mediaList?.slice(0, 3).length} More
                     </button>
                  )}
               </div>
               <div className="grid grid-cols-3 gap-2 my-2">
                  {mediaList?.slice(0, 3).map((media) => {
                     switch (true) {
                        case media.type.includes("image"):
                           return (
                              <img
                                 src={media.src} //
                                 alt={media.name}
                                 className="w-full h-[70px] border block object-contain"
                              />
                           );
                        case media.type.includes("audio"):
                           return (
                              <div className="w-full h-[70px] bg-[#D1D5DB] flex items-center justify-center">
                                 <div>
                                    <img src="/images/audio.png" alt="audio" height={30} width={30} className="mx-auto" />
                                    <span className="text-xs">{media.name}</span>
                                 </div>
                              </div>
                           );
                        default:
                           return (
                              <div className="w-full h-[70px] bg-[#D1D5DB] flex items-center justify-center">
                                 <div>
                                    <img src="/images/file.png" alt="audio" height={30} width={30} className="mx-auto" />
                                    <span className="text-xs">{media.name}</span>
                                 </div>
                              </div>
                           );
                     }
                  })}
               </div>
            </div>
         )}
      </>
   );
}
