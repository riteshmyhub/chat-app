export default function AppInfoPage() {
   return (
      <>
         <div className="flex items-center justify-center" style={{ height: "calc(80vh - 65px)" }}>
            <div className="text-center">
               <h2 className="text-3xl block capitalize">we conjoin</h2>
               <img src="/icons/icon-512x512.png" alt="app-icon" width={100} height={100} className="my-2 block mx-auto" />
               <span className="text-sm block"> Version 1.7.4</span>
               <span className="text-xs block">@ 2024 we conjoin</span>
            </div>
         </div>
      </>
   );
}
