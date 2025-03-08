import { LoaderCircleIcon, LucideProps } from "lucide-react";
import React from "react";

type FeaturesProps = {
   loading: Boolean;
   children?: React.ReactNode;
   title?: string;
};
type Props = Omit<LucideProps, "ref"> & React.SVGProps<SVGSVGElement> & FeaturesProps;

const Loading = React.forwardRef<SVGSVGElement, Props>(({ loading, children, className, title, ...props }, ref) => {
   return loading ? (
      <div className={`${className} bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-400`}>
         <span>
            <LoaderCircleIcon {...props} ref={ref} className="spin mx-auto" />
            {title && <small className="text-center">{title}</small>}
         </span>
      </div>
   ) : (
      children
   );
});
Loading.displayName = "Loading";
export { Loading };
