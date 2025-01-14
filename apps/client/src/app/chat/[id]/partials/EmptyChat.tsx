export default function EmptyChat() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <img src="/images/chat.webp" alt="empty-chat" className="w-48 h-48 object-cover mb-4" />
         <h3 className="text-xl font-semibold text-gray-800 mb-2">No Messages</h3>
         <p className="text-gray-600 text-center">Start a conversation by sending a message to someone.</p>
      </div>
   );
}
