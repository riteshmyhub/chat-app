import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

type ExtraProps = {
   title: string;
   description?: string;
};
type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & ExtraProps;

export function DialogButton({ onClick, title, description, ...props }: Props) {
   const [isOpen, setOpen] = useState(false);
   return (
      <>
         <button {...props} onClick={() => setOpen(true)} />
         <AlertDialog open={isOpen}>
            <AlertDialogContent className="bg-transparent shadow-none">
               <div className="bg-white p-3 rounded-lg">
                  <AlertDialogHeader>
                     {title && ( //
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                     )}
                     {description && ( //
                        <AlertDialogDescription className="pb-4">{description}</AlertDialogDescription>
                     )}
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <div className="flex gap-3 justify-end items-center">
                        <Button className="border border-primary text-primary bg-white hover:bg-white" onClick={() => setOpen(false)}>
                           No
                        </Button>
                        <Button
                           variant="theme"
                           onClick={(event) => {
                              if (onClick) {
                                 onClick(event);
                                 setOpen(false);
                              }
                           }}>
                           Yes
                        </Button>
                     </div>
                  </AlertDialogFooter>
               </div>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
