import { Link } from "react-router";
import useLoginController from "./login.controller";

export default function LoginPage() {
   const ctrl = useLoginController();
   return (
      <form onSubmit={ctrl.submit}>
         <div>
            <input type="text" name="email" placeholder="m@example.com" onChange={ctrl.onChange} value={ctrl.fields.email} />
         </div>
         <div>
            <input type="text" name="password" placeholder="password" onChange={ctrl.onChange} value={ctrl.fields.password} />
         </div>
         <div>
            <button type="submit" disabled={ctrl.loading}>
               Login {ctrl.loading ? "loading..." : ""}
            </button>
         </div>
         <div>
            Don&apos;t have an account? <Link to="../register">Sign up</Link>
         </div>
      </form>
   );
}
