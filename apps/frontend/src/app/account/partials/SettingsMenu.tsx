import useLogoutPage from "@/app/auth/logout/logout.page";
import { CircleUserRoundIcon, InfoIcon, LoaderCircle, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

const menu = [
   {
      title: "profile",
      navigate: "profile",
      icon: <CircleUserRoundIcon size={23} />,
   },
   // {
   //    title: "sounds",
   //    navigate: "sounds",
   //    icon: <BellIcon size={23} />,
   // },
   {
      title: "App info",
      navigate: "app-info",
      icon: <InfoIcon size={23} />,
   },
];
const SettingsMenu = () => {
   const logout = useLogoutPage();
   const navigate = useNavigate();
   return (
      <div className="p-3 md:p-8">
         <h1 className="text-4xl mb-4">Account</h1>
         <ul className="md:w-[450px]">
            {menu?.map((link, idx) => (
               <li //
                  key={`link-${idx}`}
                  className="flex items-center gap-3 py-3 md:py-3"
                  onClick={() => navigate(link.navigate)}
                  role="button">
                  {link.icon}
                  <span className="block text-lg md:text-sm font-medium capitalize">{link.title}</span>
               </li>
            ))}

            <li //
               className="flex items-center gap-3 py-3 md:py-3 text-red-600"
               role="button"
               onClick={logout.function}>
               {logout.loading ? ( //
                  <LoaderCircle size={20} className="spin" />
               ) : (
                  <LogOutIcon size={20} />
               )}
               <span className="block text-lg md:text-sm font-medium capitalize">Logout</span>
            </li>
         </ul>
      </div>
   );
};

export default SettingsMenu;
