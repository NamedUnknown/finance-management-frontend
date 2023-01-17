import { FormEvent } from "react";
import { GiCancel } from "react-icons/gi";
import { capitalize } from "../common/capitalize";

export interface EditPanelProps<T> {
  value: T;
  onEditClicked(item: T) : void;
  edit(value: T, property: string): void;
  submit(event: FormEvent) : Promise<void>;
  properties: Array<PanelProperties>;
}

export interface PanelProperties {
  name: string;
  nameCamelCase: string;
  element: string;
  type: string;
  valueFormatter?(value: any): any
}

export default function EditPanel(props: any): JSX.Element {
  const editPanelProps: EditPanelProps<Object> = props.editPanelProps;
  const properties = editPanelProps.properties;

  function getElement(prop: PanelProperties): JSX.Element {
    const value = prop.valueFormatter == null ? 
        editPanelProps.value[prop.nameCamelCase] : 
        prop.valueFormatter(editPanelProps.value[prop.nameCamelCase]);

    switch (prop.element) {
      case "textarea":
        return <textarea 
          className="text-black py-1 mt-2 px-3 w-full rounded-md" 
          maxLength={500}
          value={value}
          onChange={(event) => editPanelProps.edit(event.target.value, prop.name)}/>
      case "input":
        return <input className="text-black mt-2 py-2 px-3 w-full rounded-md"
            type={prop.type} value={value}
            onChange={(event) => editPanelProps.edit(event.target.value, prop.nameCamelCase)} />
    }
  }

  return (
    <div className="border border-slate-600 rounded-lg py-2 pl-5 pr-2">
      <div className="grow">
        <div className="flex justify-between">
          <h2 className="italic text-lg">Edit record</h2>
          <GiCancel size="23px" className="hover:scale-110 hover:cursor-pointer mb-3" onClick={() => editPanelProps.onEditClicked(null)} />
        </div>
        <form className="flex flex-col justify-evenly pr-3" onSubmit={(event) => editPanelProps.submit(event)}>
          {properties.map(
            (item, index) => {
              return (
                <label className="mb-3" key={index}>
                  {capitalize(item.name)}:<br />
                  {getElement(item)}
                </label>
              );
            }
          )}
          <div className="flex justify-center">
            <button className="my-3 w-[40%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}