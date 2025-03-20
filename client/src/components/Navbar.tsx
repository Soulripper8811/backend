import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="w-full border-b  backdrop-filter bg-transparent ">
      <div className="container px-5 py-3 items-center justify-between flex">
        <h2 className="text-2xl font-bold">
          <span className="text-violet-700">URl</span>Shortner
        </h2>
        <div className="flex gap-3">
          {authUser ? (
            <Button onClick={() => logout()}>Logout</Button>
          ) : (
            <>
              <Link to={"/login"}>
                <Button>Login</Button>
              </Link>

              <Link to={"/signup"}>
                <Button>SignUp</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
