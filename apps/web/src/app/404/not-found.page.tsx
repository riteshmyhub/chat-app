import { Header } from "@/shared/components";

export default function NotFoundPage() {
   return (
      <main>
         <Header title="Page not found" back="/" />
         <div className="flex items-center justify-center rounded-none h-[80vh]">
            <div>
               <img src="/images/404.svg" alt="not-found" height={250} width={250} className="block" />
               <h3 className="text-center mt-8 capitalize text-2xl">Page not found</h3>
            </div>
         </div>
      </main>
   );
}
