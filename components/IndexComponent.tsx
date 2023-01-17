import { FaMoneyBillWave } from "react-icons/fa";
import { BsPiggyBank } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdOutlineCardMembership } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { USER } from "./api/Constants";
import { fetchDataFromAPI } from "./api/FetchData";
import { logoutUser } from "../common/logOutUser";
import { User } from "../model/user";
import { IconType } from "react-icons/lib";


interface IndexOptions {
  name: string;
  icon: IconType;
  onClick(): void;
}


export default function IndexComponent() {
  const [user, setUser] = useState<User>(null);

  async function fetchUser() {
    const response = await fetchDataFromAPI(USER);

    if (response.statusRep.status == 200) {
      setUser(response.body as User);
    }
  }

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
      fetchUser();
    }
  },[]);

  const router = useRouter();

  const options: Array<IndexOptions> = user ?
    [
      {
        name: "Finances",
        icon: FaMoneyBillWave,
        onClick: () => {
          router.push("/finances")
        }
      },
      {
        name: "Savings",
        icon: BsPiggyBank,
        onClick: () => {
          router.push("/savings")
        }
      },
      {
        name: "Profile",
        icon: CgProfile,
        onClick: () => {
          router.push("/profile")
        }
      },
      {
        name: "Contact",
        icon: CiMail,
        onClick: () => {
          router.push("/contact")
        }
      },
      {
        name: "Log out",
        icon: FiLogOut,
        onClick: () => logoutUser()
      }
    ] :
    [
      {
        name: "Log in",
        icon: FiLogIn,
        onClick: () => {
          router.push("/login")
        }
      },
      {
        name: "Register",
        icon: MdOutlineCardMembership,
        onClick: () => {
          router.push("/register")
        }
      },
      {
        name: "Contact",
        icon: CiMail,
        onClick: () => {
          router.push("/contact")
        }
      }
    ];


  return (
    <div className="mx-20 flex">
      <div className="flex flex-col justify-center text-white py-9">
        <h1 className="text-6xl font-bold pb-4">Welcome to FINANCE MANAGER!</h1>
        {
          user != null ?
            <h3 className="pb-24 text-3xl">
              Hello {user.firstName + " " + user.lastName}!
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
                    onClick={item.onClick}>
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