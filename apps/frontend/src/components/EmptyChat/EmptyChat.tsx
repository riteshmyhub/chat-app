export function EmptyChat() {
   return (
      <div className="flex justify-center items-center h-full">
         <img //
            src="/images/chat.webp"
            alt="empty-chat"
            className="block"
            width={300}
            height={300}
            style={{ filter: "grayscale(1)" }}
         />
      </div>
   );
}
