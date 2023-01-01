import nextBase64 from "next-base64";
import { useState } from "react";
import { AUTH_LOGIN_URL } from "../components/api/Constants";
import { fetchDataFromAPI } from "../components/api/FetchData";
import AuthForm from "../components/AuthForm";
import { useRouter } from 'next/router';

import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../store/slices/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);

  const router = useRouter();

  const dispatch = useDispatch();

  const loginFormData = [
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
  ];

  async function onSubmitClicked(event) {
    event.preventDefault();
    // ? Login user
    const base64Credentials = nextBase64.encode(email + ":" + password)

    try {
      const response = await fetchDataFromAPI(AUTH_LOGIN_URL, {
        "Authorization": "Bearer " + base64Credentials,
        "Content-Type": "application/json"
      }, null, "POST", null);

      setResponseData({
        message: "Rerouting to main page...",
        status: response.status
      });

      const jwtToken = response.headers.get("Authorization");
      // ! Save to session storage
      const jwt = jwtToken.replace("Bearer ", "");
      sessionStorage.setItem("jwt", jwt);

      dispatch(setIsAuthenticated(true));

      // Reroute
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-[100vh] bg-[#0a0b1b]">
      <AuthForm
        isLogin={true}
        onSubmitClicked={onSubmitClicked}
        formData={loginFormData}
        responseData={responseData}
      />
    </div>
  );
}