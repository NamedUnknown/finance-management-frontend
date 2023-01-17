import { FormEvent, useState } from "react";
import { formatDateHTMLStyle, formatDateToJava } from "../../common/formatDate";

import { FINANCES_URL } from "../../components/api/Constants";
import { fetchDataFromAPI } from "../../components/api/FetchData";

import { useRouter } from "next/router";
import { Finance, financeToJSON } from "../../model/finance";
import { RequestParams } from "../../model/requestParams";

export default function AddFinance() {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>(0);
  const [spentAt, setSpentAt] = useState<string>(formatDateHTMLStyle(new Date()));

  const router = useRouter();

  const properties = [
    {
      // 0 - 500 chars
      name: "Description",
      property: "description",
      type: "text",
      value: description,
      handler: (desc: string) => setDescription(desc)
    },
    {
      name: "Amount",
      property: "amount",
      type: "text",
      value: amount,
      hanlder: (am: number) => {
        setAmount(am);
      }
    },
    {
      // Cant be further than now (past only)
      name: "Spent at",
      property: "spentAt",
      type: "date",
      value: spentAt,
      handler: (sp: string) => setSpentAt(sp)
    }
  ];

  async function onSubmit(event: FormEvent) : Promise<void> {
    event.preventDefault();
    const finance: Finance = {
      id: 0,
      description: description,
      amount: Number(amount),
      created: formatDateToJava(new Date()),
      spentAt: formatDateToJava(new Date(spentAt))
    };

      const params: RequestParams = {
        apiUrl: FINANCES_URL,
        method: "POST",
        body: financeToJSON(finance),
        credentials: "include"
      };

    const response = await fetchDataFromAPI(params);

    if (response.statusRep == 200) {
      router.push("/finances");
    } else {
      console.log(response);
    }
  }

  return (
    <div className="text-white mx-9">
      <h1 className="text-5xl font-bold pb-4">Add Finance</h1>
      <form className="flex flex-col" onSubmit={async (event) => await onSubmit(event)}>
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
                      onChange={(event) => item.handler(event.target.value)}
                      value={item.value} /> :
                    <input
                      className="text-black px-2 py-1 rounded w-[30%] mt-2"
                      type={item.type}
                      onChange={(event) => item.handler(event.target.value)}
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