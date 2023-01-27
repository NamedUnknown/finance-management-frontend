import React, { FormEvent } from "react";
import { formatDateToJava, formatDateToJS } from "../../common/formatDate";
import AlertBox, { AlertProps } from "../../components/AlertBox";
import { SAVINGS_DELETE, SAVINGS_GET, SAVINGS_PUT } from "../../components/api/Constants";
import { fetchDataFromAPI } from "../../components/api/FetchData";
import CustomTable from "../../components/CustomTable";
import DataComponent from "../../components/DataComponent";
import EditPanel, { EditPanelProps } from "../../components/EditPanel";
import { Savings, savingsToJSON } from "../../model/savings";
import { TableProps } from "../../model/tableProps";

export default class SavingsPage extends React.Component implements DataComponent<Savings> {

  constructor(props: any) {
    super(props);
    this.state = {
      savings: [],
      showEdit: false,
      showDelete: false,
      selected: null,
      loading: true,
      errorMessage: null
    };
  }

  async componentDidMount() {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      await this.fetchData();
    }
  }

  async fetchData(): Promise<void> {
    const response = await fetchDataFromAPI(SAVINGS_GET);

    if (response.statusRep.status == 200) {
      const list: Array<Savings> = (response.body as Array<Object>).map((value: Object) => {
        const savings = value as Savings;
        savings.created = formatDateToJS(String(savings.created));
        return savings;
      });
      this.setState({ ...this.state, savings: list, loading: false });
    } else {
      this.setState({ ...this.state, loading: false, errorMessage: "Something went worng!" });
    }
  }

  onEditClicked(item: Savings): void {
    this.setState({ ...this.state, showEdit: !this.state["showEdit"], selected: item });
  }

  edit(value: Savings, property: string): void {
    this.setState({ ...this.state, [property]: value });
  }

  onDeleteClicked(item: Savings): void {
    this.setState({ ...this.state, showDelete: !this.state["showDelete"], selected: item });
  }

  async delete(): Promise<void> {
    try {
      let item: Savings = this.state["selected"];

      const response = await fetchDataFromAPI(SAVINGS_DELETE(item.id));

      if (response.statusRep.status == 200) {
        await this.fetchData();
      } else {
        this.setState({ ...this.state, errorMessage: "Could not delete savings" });
      }
      this.setState({ ...this.state, showDelete: false, selected: null });
    } catch (err) {
      console.log(err);
    }
  }

  async submit(event: FormEvent<Element>): Promise<void> {
    event.preventDefault();
    try {
      let item: Savings = this.state["selected"];
      item.created = formatDateToJava(item.created as Date);
      this.setState({ ...this.state, selected: item });

      const savingsData = savingsToJSON(item);

      const response = await fetchDataFromAPI(SAVINGS_PUT(savingsData));

      if (response.statusRep.status == 200) {
        await this.fetchData();
      } else {
        this.setState({ ...this.state, errorMessage: "Could not add savings" });
      }
      this.setState({ ...this.state, showEdit: false, selected: null });
    } catch (err) {
      console.log(err);
    }
  }

  render(): React.ReactNode {
    const displayProps: TableProps<Savings> = {
      data: this.state["savings"],
      tableFields: [
        "Nr.",
        "Place",
        "Amount",
        "Created",
        "Actions"
      ],
      showEdit: this.state["showEdit"],
      onEditClicked: (savings) => this.onEditClicked(savings as Savings),
      edit: (value, property) => this.edit(value as Savings, property),
      showDelete: this.state["showDelete"],
      onDeleteClicked: (savings) => this.onDeleteClicked(savings as Savings),
      delete: async () => await this.delete()
    };

    const editPanelProps: EditPanelProps<Savings> = {
      value: this.state["selected"],
      onEditClicked: (savings) => this.onEditClicked(savings),
      edit: (value, property) => this.edit(value, property),
      submit: (event) => this.submit(event),
      properties: [
        { name: "place", nameCamelCase: "place", element: "input", type: "text" },
        { name: "amount", nameCamelCase: "amount", element: "input", type: "text" }
      ]
    };

    const alertProps: AlertProps = {
      title: "Are you sure you want to delete this record?",
      subtitle: <>This record will be permenantly deleted and <br /> cannot be retrieved.</>,
      cancel: () => this.onDeleteClicked(null),
      proceed: () => this.delete()
    };

    return (
      <div className="text-white">
        {this.state["loading"] ?
          <div>Loading...</div> :
          <div className="mx-9 flex flex-col">
            {this.state["showDelete"] && <AlertBox alertProps={alertProps} />}
            <div className="grow flex justify-between">
              <h1 className="text-5xl font-bold pb-4">Savings</h1>
              <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                onClick={() => { }}>Add Savings</button>
            </div>
            <div className={(this.state["showEdit"] ? "grid-cols-[60%_30%] gap-x-14" : "grid-cols-1 border border-slate-600 rounded-lg") + " grid p-2"}>
              <CustomTable displayProps={displayProps} />
              {this.state["showEdit"] && <EditPanel editPanelProps={editPanelProps} />}
            </div>
          </div>}
      </div>
    );
  }

}