import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { AUTH_REGISTER_URL } from "../components/api/Constants";
import { fetchDataFromAPI } from "../components/api/FetchData";
import { formatDateToJava } from "../common/formatDate";
import { RequestParams } from "../model/requestParams";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDay, setBirthDay] = useState(null);

  const [responseData, setResponseData] = useState(null);

  const registerFormData = [
    {
      name: "first name",
      onChange: (event) => {
        setFirstName(event.target.value);
      }
    },
    {
      name: "last name",
      onChange: (event) => {
        setLastName(event.target.value);
      }
    },
    {
      name: "email",
      onChange: (event) => {
        setEmail(event.target.value);
      }
    },
    {
      name: "password",
      onChange: (event) => {
        setPassword(event.target.value);
      }
    },
    {
      name: "birth day",
      onChange: (event) => {
        setBirthDay(event.target.value);
      }
    },
  ];

  async function onSubmitClicked(event) {
    event.preventDefault();
    let userData = new Map<string, Object>();
    userData.set("firstName", firstName);
    userData.set("lastName", lastName);
    userData.set("email", email);
    userData.set("password", password);
    userData.set("created", null);
    userData.set("birthDay", formatDateToJava(birthDay));
    userData.set("enabled", true);
  
    try {
      var params: RequestParams = {
        apiUrl: AUTH_REGISTER_URL,
        method: "POST",
        body: userData
      };

      const response = await fetchDataFromAPI(params);
      // setResponseData({
      //   message: response.body.message,
      //   status: response.status
      // });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-[100vh] bg-[#0a0b1b]">
      <AuthForm
        isLogin={false}
        formData={registerFormData}
        onSubmitClicked={onSubmitClicked}
        responseData={responseData} />
    </div>
  );
}