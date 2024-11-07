import { Button } from "@/ui/button";
import useLogoutPage from "../auth/logout/logout.page";
import { LoaderCircleIcon } from "lucide-react";

export default function HomePage() {
   const logout = useLogoutPage();
   return (
      <div>
         <h1>Home Page</h1>
         <Button onClick={logout.function} disabled={logout.loading} variant="destructive" size="sm">
            logout {logout.loading && <LoaderCircleIcon className="spin" />}
         </Button>
      </div>
   );
}
