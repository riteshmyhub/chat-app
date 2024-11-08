import { Button } from "@/ui/button";
import { Card } from "@/ui/card";

export default function ChatSettingPage() {
   return (
      <div className="p-2">
         <Card className="p-3 mb-4">
            <h3 className="text-lg font-medium mb-3">Backup Chat</h3>
            <p className="text-xs text-gray-600 mb-2">Save a copy of your chat history for future use.</p>
            <div className="text-end">
               <Button size="sm">Backup</Button>
            </div>
         </Card>
         <Card className="p-3 mb-4">
            <h3 className="text-lg font-medium mb-3">Restore Chat</h3>
            <p className="text-xs text-gray-600 mb-2">Retrieve your chat history from a previous backup.</p>
            <div className="text-end">
               <Button size="sm">Restore</Button>
            </div>
         </Card>
      </div>
   );
}
