import nextBase64 from "next-base64";
import { FormEvent, useState } from "react";
import { LOGIN } from "../components/api/Constants";
import { fetchDataFromAPI } from "../components/api/FetchData";
import AuthForm, { AuthFormParams } from "../components/AuthForm";
import { useRouter } from 'next/router';
import { ResponseParams } from "../model/resposeParams";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("marchel0925.dev@gmail.com");
  const [password, setPassword] = useState<string>("test");
  const [responseData, setResponseData] = useState<ResponseParams>(null);

  const router = useRouter();

  async function submit(event: FormEvent) {
    event.preventDefault();
    // ? Login user
    const base64Credentials: string = nextBase64.encode(email + ":" + password)

    let headers = new Map<string,Object>();
    headers.set("Authorization", "Bearer " + base64Credentials);

    try {
      const response = await fetchDataFromAPI(LOGIN(headers));

      setResponseData(response);

      const jwtToken = response.headers.get("Authorization");
      // ! Save to session storage
      const jwt = jwtToken.replace("Bearer ", "");
      sessionStorage.setItem("jwt", jwt);

      // Reroute
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  const authFormParams: AuthFormParams = {
    isLogin: true,
    submit: async (event) => await submit(event),
    response: responseData,
    formFields: [
      {
        value: email,
        name: "email",
        onChange: (value: string) => {
          setEmail(value);
        },
        type: "text"
      },
      {
        value: password,
        name: "password",
        onChange: (value: string) => {
          setPassword(value);
        },
        type: "password"
      },
    ]
  };

  return (
    <div className="h-[100vh] bg-[#0a0b1b]">
      <AuthForm authFormParams={authFormParams}/>
    </div>
  );
}