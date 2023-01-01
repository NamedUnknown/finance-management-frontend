import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="grow p-5">
      <div className="static bg-[#222331] rounded-full h-fit px-5 py-2.5 block max-h-[55px]">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center mr-5 text-white text-lg tracking-widest uppercase cursor-default hover:cursor-pointer"
            onClick={() => { router.push("/") }}>
            Finance Manager
          </div>
          {
            !isAuthenticated && (
              <div className="w-[10%] flex justify-between text-white">
                <Link href="/login">
                  Login
                </Link>
                <Link href="/register">
                  Register
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}