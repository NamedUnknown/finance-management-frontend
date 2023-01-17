import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TableProps } from "../model/tableProps";

export default function CustomTable(props: any) {
  const displayProps = props.displayProps as TableProps<Object>;
  const fields: Array<string> = displayProps.tableFields;
  const data: Array<Object> = displayProps.data;
  const showEdit: boolean = displayProps.showEdit;
  const showDelete: boolean = displayProps.showDelete;

  function dataRow(item: Object, key: number) {
    const keys = Object.keys(item).filter((value) => value != "id");
    const datelist = ["spentAt", "created"];
    return (
      <tr key={key} className="bg-[#1E2636]">
        <td className="px-4 py-2 border border-slate-600" key={key}>{key + 1}.</td>
        {
          keys.map(
            (i, k) => {
              const value: string = datelist.includes(i) ? new Date(item[i]).toLocaleDateString() : item[i];
              return (<td className="px-4 py-2 border border-slate-600" key={(k + 1) * (key + 1) + 1}>{value}</td>);
            }
          )
        }
        <td className="px-4 py-2 border border-slate-600">
          <div className="flex justify-around px-[20%]">
            {!showEdit && <AiFillEdit size="27px" color="green" className="hover:scale-110 hover:cursor-pointer" onClick={() => displayProps.onEditClicked(item)} />}
            {!showDelete && <AiFillDelete size="27px" color="red" className="hover:scale-110 hover:cursor-pointer" onClick={() => displayProps.onDeleteClicked(item)} />}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className="text-white w-full table-auto text-left h-fit">
      <thead>
        <tr className="bg-[#364153]">
          {fields.map(
            (item, index) => { return <th className="px-4 py-2 border border-slate-600" key={index}>{item}</th> }
          )}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (item, index) => {
            return dataRow(item, index);
          }
        )}
      </tbody>
    </table>
  );
}