import Link from "next/link";
import { capitalize } from "../common/capitalize";

export default function AuthForm(props) {
  const isLogin = props.isLogin;

  const formData = props.formData;

  const message = props.responseData?.message;
  const status = props.responseData?.status;

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="w-full flex justify-center">
        <div className="">
          <h1 className="text-white text-5xl mb-5">{isLogin ? "Log In" : "Register"}</h1>
          {props?.responseData && (
            status == 201 ?
              <p className=" text-green-600 italic mb-[2px] ml-1">{message} <Link className="underline tracking-tight" href="/login">Log In here!</Link></p> :
              <p className=" text-red-600 italic mb-[2px] ml-1">{message}</p>
          )}
          <form className="bg-[#222331] shadow-md rounded px-12 pt-6 pb-7 mb-4" onSubmit={props.onSubmitClicked}>
            {
              formData.map((item, index) => (
                <div className={index == formData.length - 1 ? "mb-6" : "mb-4"} key={index}>
                  <label className="block text-white text-base font-bold mb-2">
                    {capitalize(item.name)}:
                    {item.name != "birth day" ?
                      <input className="shadow bg-[#ECEEFF] appearance-none border rounded mt-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type={item.name == "password" ? item.name : "text"}
                        required
                        onChange={item.onChange}
                      /> :
                      <input className="shadow bg-[#ECEEFF] appearance-none border rounded mt-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        onChange={item.onChange}
                      />}
                  </label>
                </div>)
              )
            }
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                {isLogin ? "Log In" : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}