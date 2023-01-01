import { useState } from "react";
import { formatDateHTMLStyle, formatDateToJava } from "../../common/formatDate";

import { FINANCES_URL } from "../../components/api/Constants";
import { fetchDataFromAPI } from "../../components/api/FetchData";

import { useRouter } from "next/router";

export default function AddFinance() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [spentAt, setSpentAt] = useState(formatDateHTMLStyle(new Date().toLocaleDateString()));

  const router = useRouter();

  const properties = [
    {
      // 0 - 500 chars
      name: "Description",
      property: "description",
      type: "text",
      value: description,
      event: (event) => {
        setDescription(event.target.value)
      }
    },
    {
      name: "Amount",
      property: "amount",
      type: "text",
      value: amount,
      event: (event) => {
        setAmount(event.target.value)
      }
    },
    {
      // Cant be further than now (past only)
      name: "Spent at",
      property: "spentAt",
      type: "date",
      value: spentAt,
      event: (event) => {
        setSpentAt(event.target.value)
      }
    }
  ];

  async function onSubmit(event) {
    event.preventDefault();
    const jsonFinance = JSON.stringify(
      {
        id: 0,
        description: description,
        amount: Number(amount),
        created: formatDateToJava(new Date().toLocaleDateString()),
        spentAt: formatDateToJava(spentAt)
      }
    );
    const response = await fetchDataFromAPI(
      FINANCES_URL,
      null,
      jsonFinance,
      "POST",
      "include"
    );

    if (response.status == 200) {
      router.push("/finances");
    } else {
      console.log(response);
    }
  }

  return (
    <div className="text-white mx-9">
      <h1 className="text-5xl font-bold pb-4">Add Finance</h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        {
          properties.map(
            (item, index) => {
              return (
                <div className="mb-5" key={index}>
                  <label className="w-full text-xl">
                    <p>{item.name}:</p>
                  </label>
                  {item.property == "description" ?
                    <textarea
                      maxLength={500}
                      className="text-black p-2 rounded w-[30%] mt-2"
                      onChange={item.event}
                      value={item.value} /> :
                    <input
                      className="text-black px-2 py-1 rounded w-[30%] mt-2"
                      type={item.type}
                      onChange={item.event}
                      value={item.value.toString()}
                    />}
                </div>
              )
            }
          )
        }
        <button
          type="submit"
          className="mt-9 rounded px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline w-fit min-w-[10%]"
        >
          Save
        </button>
      </form>
    </div>
  );
}