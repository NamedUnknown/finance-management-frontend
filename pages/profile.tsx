import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../components/api/FetchData";
import { AUTH_URL } from "../components/api/Constants";
import Image from "next/image";
import { formatDateToJS } from "../common/formatDate";

import { useSelector, useDispatch } from "react-redux";
import { user, setUserData } from "../store/slices/authSlice"

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const userDetails = useSelector(user);

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchProfileInfo() {
      const response = await fetchDataFromAPI(AUTH_URL, null, null, "GET", "include");
      dispatch(setUserData(response.body));
      setIsLoading(false);
    }

    // set isAuthenticated
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      fetchProfileInfo();
    }
  }, []);

  const mainProfileView = [
    {
      name: "First name",
      attribute: "firstName"
    },
    {
      name: "Last name",
      attribute: "lastName"
    },
    {
      name: "Email",
      attribute: "email"
    },
    {
      name: "Date of birth",
      attribute: "birthDay"
    },
  ]

  const accountView = [
    {
      name: "Roles",
      attribute: "authorities"
    },
    {
      name: "Account created",
      attribute: "created"
    },
  ];

  function formatRole(role) {
    return role.toString().replace("ROLE_", "");
  }

  const mainProfileInfo = () => {
    return (
      <div className="bg-[#222331] rounded-3xl p-5 grid grid-rows-2 gap-3 w-[80%]">
        <div className="flex justify-center m-[auto]">
          <Image src="/user.png" width="350px" height="350px" alt="user.png" />
        </div>
        <div className="flex flex-col justify-evenly">
          <h2 className="text-lg ml-3 mb-2">My profile</h2>
          {mainProfileView.map(
            (item, index) => {
              return properyField(item, index);
            }
          )}
        </div>
      </div>
    );
  }

  const accountInfo = () => {
    return (
      <div className="rounded-3xl p-5 bg-[#222331] w-[80%] h-fit">
        <div className="flex flex-col justify-evenly">
          <h2 className="text-lg ml-3 mb-2">Account info</h2>
          {accountView.map(
            (item, index) => {
              return properyField(item, index);
            }
          )}
        </div>
      </div>
    );
  }

  const properyField = (item, key) => {
    let attribute;
    const roles = [];
    if (item.attribute == "created" || item.attribute == "birthDay") {
      attribute = formatDateToJS(userDetails[item.attribute]).toLocaleDateString();
    } else if (item.attribute == "authorities") {
      attribute = "";
      const list = userDetails[item.attribute];
      for (const auth of list) {
        roles.push(formatRole(auth.authority));
      }
    } else {
      attribute = userDetails[item.attribute];
    }
    return (
      <div className="pl-3 pr-5 py-3 mb-2 rounded-lg bg-[#423E52] hover:translate-x-3 hover:w-[95%] transition-transform" key={key}>
        <h3 className="mb-1">{item.name}:</h3>
        {item.attribute == "authorities" ?
          <div>
            {roles.map(
              (item, index) => {
                return (<h2 className="pl-2 text-xl" key={index}>{item.toString()}</h2>)
              }
            )}
          </div> :
          <h2 className="pl-2 text-xl">{attribute}</h2>}
      </div>
    );
  }


  return (
    <div className="text-white">
      {isLoading ?
        <div>Loading...</div> :
        <div className="">
          <div className="mx-9 flex flex-col">
            <h1 className="text-5xl font-bold pb-4">Profile</h1>
            <div className="grid grid-cols-2 gap-x-36">
              <div className="flex justify-center">
                {mainProfileInfo()}
              </div>
              <div className="grid grid-rows-2 gap-y-5">
                <div className="flex justify-center">
                  {accountInfo()}
                </div>
                <div className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
}