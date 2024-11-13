import React, { useEffect, useState } from "react";

const InstallApp: React.FC = () => {
   const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
   const [showInstallButton, setShowInstallButton] = useState(false);

   useEffect(() => {
      const handleBeforeInstallPrompt = (e: Event) => {
         e.preventDefault();
         setDeferredPrompt(e);
         setShowInstallButton(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
         window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
   }, []);

   const handleInstallClick = async () => {
      if (deferredPrompt) {
         const promptEvent = deferredPrompt as any; // Casting as 'any' to access 'prompt' method
         promptEvent.prompt();

         const choiceResult = await promptEvent.userChoice;
         if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
         } else {
            console.log("User dismissed the install prompt");
         }

         setDeferredPrompt(null);
         setShowInstallButton(false);
      }
   };

   if (!showInstallButton) return null;

   return (
      <div className="install-prompt">
         <button onClick={handleInstallClick}>Install App</button>
      </div>
   );
};

export { InstallApp };
