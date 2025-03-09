import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router";

type Props = {
   path: string;
   children?: ReactNode;
   activeClass: string;
   className?: string;
   replace?: boolean;
};

export function RouterLink({ path, className, children, activeClass, replace }: Props) {
   const { pathname } = useLocation();
   const isActive = pathname.includes(path);
   return (
      <NavLink to={path} className={`${className} ${isActive ? activeClass : ""}`} replace={Boolean(replace)}>
         {children}
      </NavLink>
   );
}
