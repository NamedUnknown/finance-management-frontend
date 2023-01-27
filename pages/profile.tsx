import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../components/api/FetchData";
import { USER } from "../components/api/Constants";
import Image from "next/image";
import { formatDateToJS } from "../common/formatDate";
import { User } from "../model/user";

interface ProfileProps {
  name: string;
  nameCamelCase: string;
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();


  useEffect(() => {
    async function fetchProfileInfo() {
      const response = await fetchDataFromAPI(USER);

      if (response.statusRep.status == 200) {
        let u: User = response.body as User;
        u.birthDay = formatDateToJS(u.birthDay as string);
        u.created = formatDateToJS(u.created as string);

        setUser(u);
      }
      setIsLoading(false);
    }

    // set isAuthenticated
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      fetchProfileInfo();
    }
  }, []);

  const mainProfileView: Array<ProfileProps> = [
    {name: "First name",nameCamelCase: "firstName"},
    {name: "Last name",nameCamelCase: "lastName"},
    {name: "Email",nameCamelCase: "email"},
    {name: "Date of birth",nameCamelCase: "birthDay"},
  ];

  const accountView : Array<ProfileProps> = [
    {name: "Roles", nameCamelCase: "authorities"},
    {name: "Account created",nameCamelCase: "created"},
  ];

  function formatRole(role: string) : string {
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

  const properyField = (item: ProfileProps, key: number) => {
    const dateAttributes: Array<string> = ["created", "birthDay"];
    let attribute;
    const roles = [];
    if (dateAttributes.includes(item.nameCamelCase)) {
      attribute = (user[item.nameCamelCase] as Date).toLocaleDateString();
    } else if (item.nameCamelCase == "authorities") {
      attribute = "";
      const list: Array<string> = user[item.nameCamelCase];
      for (const auth of list) {
        roles.push(formatRole(auth["authority"]));
      }
    } else {
      attribute = user[item.nameCamelCase];
    }
    return (
      <div className="pl-3 pr-5 py-3 mb-2 rounded-lg bg-[#423E52] hover:translate-x-3 hover:w-[95%] transition-transform" key={key}>
        <h3 className="mb-1">{item.name}:</h3>
        {item.nameCamelCase == "authorities" ?
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