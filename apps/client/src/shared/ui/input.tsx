import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   labelClass?: string;
   error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, labelClass, error, ...props }, ref) => {
   return (
      <>
         {label && (
            <Label htmlFor={props?.id} className="mb-2 block text-sm font-medium">
               {label}
               {props.required ? "*" : ""}
            </Label>
         )}
         <input type={type} className={cn("w-full h-12 px-3 text-sm rounded-md border text-gray-900 dark:text-gray-50 dark:bg-gray-900 dark:border-gray-700 ", className)} ref={ref} {...props} />
         {!!error && <small className="text-red-500">{error}</small>}
      </>
   );
});
Input.displayName = "Input";

export { Input };
