import { Link } from "react-router";
import useRegisterController from "./register.controller";

export default function RegisterPage() {
   const ctrl = useRegisterController();
   return (
      <form onSubmit={ctrl.submit} className="flex h-screen w-full items-end md:items-center justify-center">
         <div className="grid gap-2">
            <input //
               id="email"
               name="email"
               type="email"
               placeholder="m@example.com"
               autoComplete="off"
               onChange={ctrl.onChange}
               value={ctrl.fields.email}
               required
            />
         </div>
         <div>
            <input //
               id="password"
               name="password"
               type="text"
               placeholder="password"
               autoComplete="off"
               onChange={ctrl.onChange}
               value={ctrl.fields.password}
               required
            />
         </div>
         <div>
            <input //
               id="confirmPassword"
               type="text"
               name="confirmPassword"
               placeholder="confirm password"
               autoComplete="off"
               onChange={ctrl.onChange}
               value={ctrl.fields.confirmPassword}
               required
            />
         </div>
         <button type="submit" className="w-full" disabled={ctrl.loading}>
            Register
            {ctrl.loading ? "loading..." : ""}
         </button>
         <div>
            Already have an account? <Link to="../login">Login</Link>
         </div>
      </form>
   );
}
