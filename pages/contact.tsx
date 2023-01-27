import { FormEvent, useEffect, useState } from "react";
import { formatDateToJava, formatDateToJS } from "../common/formatDate";
import { CONTACT_GET_LIMITED, CONTACT_POST, USER } from "../components/api/Constants";
import { fetchDataFromAPI } from "../components/api/FetchData";
import ListView from "../components/ListView";
import { Contact, contactToJSON } from "../model/contact";
import { User } from "../model/user";

interface FormProperty {
  name: string;
  nameCamelCase: string;
  value: FormValue;
  maxChars: number;
  handle(value: string): void;
}

interface FormValue {
  value: string;
  error?: string;
}

export default function ContactPage() {
  const [title, setTitle] = useState<FormValue>({ value: "" });
  const [content, setContent] = useState<FormValue>({ value: "" });
  const [user, setUser] = useState<User>();
  const [contactNotResponded, setContactNotResponded] = useState<Array<Contact>>([]);

  async function fetchUser() {
    const response = await fetchDataFromAPI(USER);

    if (response.statusRep.status == 200) {
      setUser(response.body as User);
    }
  }

  async function fetchContact() {
    const response = await fetchDataFromAPI(CONTACT_GET_LIMITED);

    if (response.statusRep.status == 200) {
      const list: Array<Contact> = (response.body as Array<Object>).map((value: Object) => {
        const contact = value as Contact;
        contact.created = formatDateToJS(String(contact.created));
        return contact;
      });
      setContactNotResponded(list);
    }
  }

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
      fetchUser();
      fetchContact();
    }
  }, []);

  const properties: Array<FormProperty> = [
    {
      name: "Title",
      nameCamelCase: "title",
      value: title,
      maxChars: 100,
      handle: (value) => setTitle({ value: value })
    },
    {
      name: "Content",
      nameCamelCase: "content",
      value: content,
      maxChars: 500,
      handle: (value) => setContent({ value: value })
    }
  ];

  async function submit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      const contact: Contact = {
        title: title.value,
        content: content.value,
        email: user.email,
        created: formatDateToJava(new Date())
      };

      const contactData = contactToJSON(contact);

      const response = await fetchDataFromAPI(CONTACT_POST(contactData));

      if (response.statusRep.status == 200) {
        await fetchContact();
      } else {
        console.log("Error ", response.statusRep.status);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-white mx-9">
      <h1 className="text-5xl font-bold pb-4">Contact</h1>
      <div className="flex">
        <form className="flex flex-col w-full" onSubmit={submit}>
          {
            properties.map(
              (item, index) => {
                return (
                  <label key={index} className=" flex flex-col">
                    <h4 className="my-3">
                      {item.name}:
                    </h4>
                    {
                      item.maxChars > 100 ?
                        <textarea
                          className="text-black w-[85%] h-28 p-1"
                          onChange={(event) => item.handle(event.target.value)}
                          maxLength={item.maxChars} /> :
                        <textarea
                          className="text-black mb-12 w-[60%] p-1"
                          onChange={(event) => item.handle(event.target.value)}
                          maxLength={item.maxChars} />

                    }
                  </label>
                );
              }
            )
          }
          <button
            type="submit"
            className="mt-9 rounded px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline w-fit min-w-[20%]"
          >
            Send
          </button>
        </form>
        <div className="flex flex-col w-full">
          {contactNotResponded.length > 0 && <ListView listData={{ data: contactNotResponded, title: "Submited" }} />}
        </div>
      </div>
    </div>
  );
}