import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { AUTH_REGISTER_URL } from "../components/api/Constants";
import { fetchDataFromAPI } from "../components/api/FetchData";
import { formatDateToJava } from "../common/formatDate";

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
    const userData = JSON.stringify(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        created: null,
        birthDay: formatDateToJava(birthDay),
        enabled: true,
      }
    );
    try {
      const response = await fetchDataFromAPI(AUTH_REGISTER_URL, {
        "Content-Type": "application/json",
      }, userData, "POST");
      setResponseData({
        message: response.body.message,
        status: response.status
      });
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