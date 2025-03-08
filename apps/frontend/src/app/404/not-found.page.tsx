import { Image } from "@/shared/components";

export default function NotFoundPage() {
   return (
      <main>
         <div className="h-screen flex items-center justify-center rounded-none">
            <div>
               <Image src="/images/404.svg" alt="not-found" height={250} width={250} className="block" />
               <h3 className="text-center mt-8 capitalize text-2xl">Page not found</h3>
            </div>
         </div>
      </main>
   );
}