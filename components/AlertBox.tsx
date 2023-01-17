import { GiCancel } from "react-icons/gi";

export interface AlertProps {
  title: string;
  subtitle?: JSX.Element;
  cancel: Function;
  proceed: Function;
}

export default function AlertBox(props: any) : JSX.Element {
  const alertProps: AlertProps = props.alertProps;
  
  return (
      <div className="grow flex justify-center">
        <div role="alert" className="w-fit mb-5 mt-2">
          <div className="bg-red-500 text-white font-bold rounded-t flex justify-between items-center py-2 px-3">
            Alert
            <GiCancel size="20px" className="hover:scale-110 hover:cursor-pointer" onClick={() => alertProps.cancel()} />
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{alertProps.title}</p>
            {alertProps.subtitle && <><br /><p>{alertProps.subtitle}</p></>}
            <br />
            <div className="grow flex justify-between mx-6">
              <button className="px-3 py-1 text-black font-bold" onClick={() => alertProps.cancel()}>Cancel</button>
              <button
                className="rounded px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline"
                onClick={() => alertProps.proceed()}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    );
}