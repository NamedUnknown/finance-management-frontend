import { useSelector, useDispatch } from "react-redux"
import { getIsAuthenticated, getUser } from "../store/slices/authSlice";

import { signIn } from "next-auth/react"
import Image from "next/image";

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);
  const loginMethods = [
    {
      name: "github",
      img: "/github.png",
    },
    {
      name: "google",
      img: "/google.png",
    }
  ];

  return (
    <div className="grow p-5">
      <div className="static bg-[#222331] rounded-full h-fit px-5 py-2.5">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center mr-5 text-white text-lg tracking-widest uppercase cursor-default">
            Finance Manager
          </div>
          <div id="login" className="flex">
            <div className="flex flex-col justify-center mr-5 text-white cursor-default">
              LOG IN:
            </div>
            {
              loginMethods.map((method, index) =>
                <div key={index}
                  className="flex justify-center w-10 h-10 p-0.5 rounded-lg bg-white backdrop-blur mx-2.5 hover:transition ease-in-out hover:-translate-y-1 cursor-pointer"
                  onClick={() => signIn(method.name)} >
                  <div className="h-[100%] w-fit flex flex-col justify-center">
                    <Image
                      width="30px"
                      height="30px"
                      src={method.img}
                      alt={method.name} />
                  </div>
                </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}