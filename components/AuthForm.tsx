import { FormEvent } from "react";
import { capitalize } from "../common/capitalize";
import { ResponseParams } from "../model/resposeParams";

export interface AuthFormParams {
  isLogin: boolean;
  submit(event: FormEvent): Promise<void>;
  response: ResponseParams;
  formFields: Array<FormField>
}

export interface FormField {
  value?: any;
  name: string;
  onChange(value: string): void;
  type: string;
}

export default function AuthForm(props: any) : JSX.Element {
  const params: AuthFormParams = props.authFormParams;
  const isLogin: boolean = params.isLogin;
  const formFields: Array<FormField> = params.formFields;
  const response: ResponseParams = params.response;

  return (
    <div className  ="h-screen flex flex-col justify-center">
      <div className="w-full flex justify-center">
        <div>
          <h1 className="text-white text-5xl mb-5">{isLogin ? "Log In" : "Register"}</h1>
          {response && <p className={"text-["+ response.statusRep.hexColor +"] italic mb-[2px] ml-1"}>{response.body?.toString()}</p>}
          <form className="bg-[#222331] shadow-md rounded px-12 pt-6 pb-7 mb-4" onSubmit={(event) =>  params.submit(event)}>
            {
              formFields.map((item, index) => (
                <div className={index == formFields.length - 1 ? "mb-6" : "mb-4"} key={index}>
                  <label className="block text-white text-base font-bold mb-2">
                    {capitalize(item.name)}:
                    {<input 
                      className="shadow bg-[#ECEEFF] appearance-none border rounded mt-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={item.type}
                      value={item.value}
                      required
                      onChange={(event) => item.onChange(event.target.value)}
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