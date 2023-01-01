import { FaMoneyBillWave } from "react-icons/fa";
import { BsPiggyBank } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdOutlineCardMembership } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AUTH_URL } from "./api/Constants";
import { fetchDataFromAPI } from "./api/FetchData";
import { getCookie, hasCookie } from 'cookies-next';
import { logOutUser } from "../common/logOutUser";

import { useDispatch, useSelector } from "react-redux";
import { setUserData, user } from "../store/slices/authSlice"


export default function IndexComponent() {
  const dispatch = useDispatch();
  const userDetails = useSelector(user)

  useEffect(() => {
    async function getUserData() {
      const response = await fetchDataFromAPI(AUTH_URL, null, null, "GET", "include");
      dispatch(setUserData(response.body))

      // get XSRF_TOKEN and save to session storage
      if (hasCookie("XSRF-TOKEN")) {
        const token = getCookie("XSRF-TOKEN");
        sessionStorage.setItem("XSRF-TOKEN", token);
      }
    }

    const jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
      getUserData();
    }
  }, []);

  const router = useRouter();

  const options = userDetails != null ?
    [
      {
        name: "Finances",
        icon: FaMoneyBillWave,
        action: () => {
          router.push("/finances")
        }
      },
      {
        name: "Savings",
        icon: BsPiggyBank,
        action: () => {
          router.push("/savings")
        }
      },
      {
        name: "Profile",
        icon: CgProfile,
        action: () => {
          router.push("/profile")
        }
      },
      {
        name: "Contact",
        icon: CiMail,
        action: () => {
          router.push("/contact")
        }
      },
      {
        name: "Log out",
        icon: FiLogOut,
        action: () => logOutUser()
      }
    ] :
    [
      {
        name: "Log in",
        icon: FiLogIn,
        action: () => {
          router.push("/login")
        }
      },
      {
        name: "Register",
        icon: MdOutlineCardMembership,
        action: () => {
          router.push("/register")
        }
      },
      {
        name: "Contact",
        icon: CiMail,
        action: () => {
          router.push("/contact")
        }
      }
    ];

  return (
    <div className="mx-20 flex">
      <div className="flex flex-col justify-center text-white py-9">
        <h1 className="text-6xl font-bold pb-4">Welcome to FINANCE MANAGER!</h1>
        {
          userDetails != null ?
            <h3 className="pb-24 text-3xl">
              Hello {userDetails.firstName + " " + userDetails.lastName}!
            </h3> :
            <h3 className="text-3xl pb-24">You are not authenticated...</h3>
        }
        <h3 className="text-4xl pb-6 ml-2">Explore your options</h3>
        <div className="flex flex-col">
          {
            options.map(
              (item, index) => {
                return (
                  <div className="text-white text-lg bg-[#423E52] py-2 italic w-[40%] rounded-lg mb-7 hover:cursor-pointer hover:translate-x-3 hover:w-[42%] transition-all flex justify-between px-7"
                    key={index}
                    onClick={item.action}>
                    {item.name}
                    <item.icon color="white" size="20px" style={{ "margin": "auto 0 auto 0" }} />
                  </div>
                );
              }
            )
          }
        </div>
      </div>
    </div>
  );
}