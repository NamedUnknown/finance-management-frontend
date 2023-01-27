import { FormEvent, useState } from "react";
import { formatDateHTMLStyle, formatDateToJava, formatDateToJS, formatFromHTMLToJS} from "../../common/formatDate";

import { fetchDataFromAPI } from "../../components/api/FetchData";

import { useRouter } from "next/router";
import { Finance, financeToJSON } from "../../model/finance";
import { FINANCES_POST } from "../../components/api/Constants";

interface AddFormProps {
  name: string;
  nameCamelCase: string;
  type: string;
  value: any;
  handler(value: any): void;
}

interface ValueErrorProps {
  value: string;
  error?: string;
}

export default function AddFinance() {
  const [description, setDescription] = useState<ValueErrorProps>({value: ""});
  const [amount, setAmount] = useState<ValueErrorProps>({value: "0"});
  const [spentAt, setSpentAt] = useState<ValueErrorProps>({value: formatDateHTMLStyle(new Date())});
  let properties: Array<AddFormProps> = [
    {
      // 0 - 500 chars
      name: "Description",
      nameCamelCase: "description",
      type: "text",
      value: description,
      handler: (desc: string) => setDescription({value: desc})
    },
    {
      name: "Amount",
      nameCamelCase: "amount",
      type: "text",
      value: amount,
      handler: (am: string) => {
        if (am && Number.isNaN(parseFloat(am))) {
          setAmount({value: amount.value, error: "Provided value is not a number"})
          return;
        }
        setAmount({value: am});
      }
    },
    {
      // Cant be further than now (past only)
      name: "Spent at",
      nameCamelCase: "spentAt",
      type: "date",
      value: spentAt,
      handler: (sp: string) => setSpentAt({value: sp})
    }];

  const router = useRouter();


  async function submit(event: FormEvent) : Promise<void> {
    event.preventDefault();
    try {
      const finance: Finance = {
        id: 0,
        description: description.value,
        amount: Number(parseFloat(amount.value).toFixed(2)),
        created: formatDateToJava(new Date()),
        spentAt: formatDateToJava(formatFromHTMLToJS(spentAt.value))
    };

    const response = await fetchDataFromAPI(FINANCES_POST(financeToJSON(finance)));

    if (response.statusRep.status == 200) {
      router.push("/finances");
    } else {
      console.log(response);
    }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  return (
    <div className="text-white mx-9">
      <h1 className="text-5xl font-bold pb-4">Add Finance</h1>
      <form className="flex flex-col" onSubmit={async (event) => await submit(event)}>
        {
          properties.map(
            (item, index) => {
              return (
                <div className="mb-5" key={index}>
                  <label className="w-full text-xl">
                    <p>{item.name}:</p>
                  </label>
                  {item.value.error && <p className="text-red italic">{item.value.error}</p>}
                  {item.nameCamelCase == "description" ?
                    <textarea
                      maxLength={500}
                      className="text-black p-2 rounded w-[30%] mt-2"
                      onChange={(event) => item.handler(event.target.value)}
                      value={item.value.value.toString()} /> :
                    <input
                      className="text-black px-2 py-1 rounded w-[30%] mt-2"
                      type={item.type}
                      onChange={(event) => item.handler(event.target.value)}
                      value={item.value.value.toString()}
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