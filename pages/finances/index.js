import { useEffect, useState } from "react";
import { FINANCES_URL } from "../../components/api/Constants";
import { fetchDataFromAPI } from "../../components/api/FetchData";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { formatDateToJava, formatDateToJS } from "../../common/formatDate";
import { capitalize } from "../../common/capitalize"

import { useRouter } from "next/router";

export default function Finances() {
  const [isLoading, setIsLoading] = useState(true);
  const [finances, setFinances] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const router = useRouter();

  const fields = [
    "Nr.",
    "Amount",
    "Spent at",
    "Description",
    "Created",
    "Actions"
  ];

  async function fetchFinances() {
    const response = await fetchDataFromAPI(FINANCES_URL, null, null, "GET", "include");
    setFinances(response.body);
    setIsLoading(false);
  }

  useEffect(() => {
    // set isAuthenticated
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      fetchFinances();
    }
  }, []);

  function handleOnClickEdit(item) {
    setShowEdit(!showEdit);
    setSelectedItem(item);
  }

  const handleEdit = (event, property) => {
    setSelectedItem({ ...selectedItem, [property]: event.target.value })
  }

  async function onSubmitClicked(event) {
    event.preventDefault();
    try {
      setSelectedItem({ ...selectedItem, ["created"]: formatDateToJava(selectedItem["created"]), ["spentAt"]: formatDateToJava(selectedItem["spentAt"]) })
      const jsonData = JSON.stringify(selectedItem);
      const response = await fetchDataFromAPI(
        FINANCES_URL,
        null,
        jsonData,
        "PUT",
        "include"
      );

      if (response.status == 200) {
        await fetchFinances();
      } else {
        console.log(response);
      }
      setShowEdit(false);
      setSelectedItem(null);
    } catch (err) {
      console.log(err);
    }
  }

  const alertBox = () => {
    return (
      <div className="grow flex justify-center">
        <div role="alert" className="w-fit mb-5 mt-2">
          <div className="bg-red-500 text-white font-bold rounded-t flex justify-between items-center py-2 px-3">
            Alert
            <GiCancel size="20px" className="hover:scale-110 hover:cursor-pointer" onClick={() => handleOnClickDelete(null)} />
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Are you sure you want to delete this record?</p>
            <br />
            <p>This record will be permenantly deleted and <br /> cannot be retrieved.</p>

            <br />
            <div className="grow flex justify-between mx-6">
              <button className="px-3 py-1 text-black font-bold" onClick={() => handleOnClickDelete(null)}>Cancel</button>
              <button
                className="rounded px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline"
                onClick={() => onDelete()}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function handleOnClickDelete(item) {
    setShowDelete(!showDelete);
    setSelectedItem(item);
  }

  async function onDelete() {
    try {
      setSelectedItem({ ...selectedItem, ["created"]: formatDateToJava(selectedItem["created"]), ["spentAt"]: formatDateToJava(selectedItem["spentAt"]) })
      const jsonData = JSON.stringify(selectedItem);
      const response = await fetchDataFromAPI(
        FINANCES_URL,
        null,
        jsonData,
        "DELETE",
        "include"
      );

      if (response.status == 200) {
        await fetchFinances();
      } else {
        console.log(response);
      }
      setShowDelete(false);
      setSelectedItem(null);
    } catch (err) {
      console.log(err);
    }
  }

  const financeRow = (item, key) => {
    return (
      <tr key={key} className="bg-[#1E2636]">
        <td className="px-4 py-2 border border-slate-600">{key + 1}.</td>
        <td className="px-4 py-2 border border-slate-600">{item.amount}</td>
        <td className="px-4 py-2 border border-slate-600">{formatDateToJS(item.spentAt).toLocaleDateString()}</td>
        <td className="px-4 py-2 border border-slate-600 italic">{item.description}</td>
        <td className="px-4 py-2 border border-slate-600">{formatDateToJS(item.created).toLocaleDateString()}</td>
        <td className="px-4 py-2 border border-slate-600">
          <div className="flex justify-around px-[20%]">
            {!showEdit && <AiFillEdit size="27px" color="green" className="hover:scale-110 hover:cursor-pointer" onClick={() => handleOnClickEdit(item)} />}
            {!showDelete && <AiFillDelete size="27px" color="red" className="hover:scale-110 hover:cursor-pointer" onClick={() => handleOnClickDelete(item)} />}
          </div>
        </td>
      </tr>
    );
  };

  const editPanel = () => {
    const properties = [
      {
        name: "amount",
        type: "text"
      },
      {
        name: "description",
        type: "text"
      },
      {
        name: "spent at",
        type: "date"
      },
    ];
    return (
      <div className="border border-slate-600 rounded-lg py-2 pl-5 pr-2">
        <div className="grow">
          <div className="flex justify-between">
            <h2 className="italic text-lg">Edit record</h2>
            <GiCancel size="23px" className="hover:scale-110 hover:cursor-pointer mb-3" onClick={() => handleOnClickEdit(null)} />
          </div>
          <form className="flex flex-col justify-evenly pr-3" onSubmit={onSubmitClicked}>
            {properties.map(
              (item, index) => {
                return (
                  <label className="mb-3" key={index}>
                    {capitalize(item.name)}:<br />
                    {item.name == "description" ?
                      <textarea className="text-black py-1 mt-2 px-3 w-full rounded-md"
                        maxLength="500"
                        value={selectedItem[item.name].toString()}
                        onChange={(event) => handleEdit(event, item.name)}
                      /> :
                      (
                        item.name == "spent at" ?
                          <input className="text-black mt-2 py-2 px-3 w-full rounded-md"
                            type={item.type} value={selectedItem.spentAt.toString()}
                            onChange={(event) => handleEdit(event, "spentAt")} /> :
                          <input className="text-black mt-2 py-2 px-3 w-full rounded-md"
                            type={item.type} value={selectedItem[item.name].toString()}
                            onChange={(event) => handleEdit(event, item.name)} />
                      )}
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

  return (
    <div className="text-white">
      {isLoading ?
        <div>Loading...</div> :
        <div>
          <div className="mx-9 flex flex-col">
            {showDelete && alertBox()}
            <div className="grow flex justify-between">
              <h1 className="text-5xl font-bold pb-4">Finances</h1>
              <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                onClick={() => router.push("/finances/add")}>Add finance</button>
            </div>
            <div className={(showEdit ? "grid-cols-[60%_30%] gap-x-14" : "grid-cols-1 border border-slate-600 rounded-lg") + " grid p-2"}>
              <table className="text-white w-full table-auto text-left h-fit">
                <thead>
                  <tr className="bg-[#364153]">
                    {fields.map(
                      (item, index) => { return <th className="px-4 py-2 border border-slate-600" key={index}>{item}</th> }
                    )}
                  </tr>
                </thead>
                <tbody>
                  {finances.map(
                    (item, index) => {
                      return financeRow(item, index);
                    }
                  )}
                </tbody>
              </table>
              {showEdit && editPanel()}
            </div>
          </div>
        </div>}
    </div>
  );
}