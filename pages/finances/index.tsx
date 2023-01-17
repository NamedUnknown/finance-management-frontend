import React, { FormEvent } from "react";
import { FINANCES_GET, FINANCES_DELETE, FINANCES_PUT } from "../../components/api/Constants";
import { fetchDataFromAPI } from "../../components/api/FetchData";
import { formatDateHTMLStyle, formatDateToJava, formatDateToJS } from "../../common/formatDate";

import CustomTable from "../../components/CustomTable";
import { Finance, financeToJSON } from "../../model/finance";
import { TableProps } from "../../model/tableProps";
import AlertBox, { AlertProps } from "../../components/AlertBox";
import EditPanel, { EditPanelProps } from "../../components/EditPanel";
import DataComponent from "../../components/DataComponent";

export default class FinancesPage extends React.Component implements DataComponent<Finance> {

  constructor(props: any) {
    super(props);
    this.state = {
      finances: [], 
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
    console.log(this.state);
  }

  async fetchData(): Promise<void> {
    const response = await fetchDataFromAPI(FINANCES_GET);

    if (response.statusRep.status == 200) {
      const list: Array<Finance> = (response.body as Array<Object>).map((value: Object) => {
        const finance = value as Finance;
        finance.created = formatDateToJS(String(finance.created));
        finance.spentAt = formatDateToJS(String(finance.spentAt));
        return finance;
      });
      this.setState({...this.state, finances: list, loading: false});
    } else {
      this.setState({...this.state, loading: false, errorMessage: "Something went worng!"});
    }
  }

  onEditClicked(item: Finance): void {
    this.setState({...this.state, showEdit: !this.state["showEdit"], selected: item});
  }

  edit(value: Finance, property: string): void {
    this.setState({...this.state, [property]: value});
  }

  onDeleteClicked(item: Finance): void {
    this.setState({...this.state, showDelete: !this.state["showDelete"], selected: item});
  }

  async delete(): Promise<void> {
    try {
      let item: Finance = this.state["selected"];

      const response = await fetchDataFromAPI(FINANCES_DELETE(item.id));

      if (response.statusRep.status == 200) {
        await this.fetchData();
      } else {
        this.setState({...this.state, errorMessage: "Could not delete finance"});
      }
      this.setState({...this.state, showDelete: false, selected: null});
    } catch (err) {
      console.log(err);
    }
  }

  async submit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      let item: Finance = this.state["selected"];
      item.created = formatDateToJava(item.created as Date);
      this.setState({...this.state, selected: item});

      const financeData = financeToJSON(item);

      const response = await fetchDataFromAPI(FINANCES_PUT(financeData));

      if (response.statusRep.status == 200) {
        await this.fetchData();
      } else {
        this.setState({...this.state, errorMessage: "Could not add finance"});
      }
      this.setState({...this.state, showEdit: false, selected: null});
    } catch (err) {
      console.log(err);
    }
  }

  render() : React.ReactNode {
    const displayProps: TableProps<Finance> = {
      data: this.state["finances"],
      tableFields: [
        "Nr.",
        "Description",
        "Amount",
        "Created",
        "Spent at",
        "Actions"
      ],
      showEdit: this.state["showEdit"],
      onEditClicked: (finance) => this.onEditClicked(finance as Finance),
      edit:(value, property) => this.edit(value as Finance, property),
      showDelete: this.state["showDelete"],
      onDeleteClicked: (finance) => this.onDeleteClicked(finance as Finance),
      delete: async () => await this.delete()
    };

    const editPanelProps: EditPanelProps<Finance> = {
      value: this.state["selected"],
      onEditClicked: (finance) => this.onEditClicked(finance),
      edit:(value, property) => this.edit(value, property),
      submit:(event) => this.submit(event),
      properties: [
        {name: "amount", nameCamelCase: "amount", element: "input", type: "text"},
        {name: "description", nameCamelCase: "description", element: "textarea", type: "text"},
        {name: "spent at", nameCamelCase: "spentAt", element: "input", type: "date", valueFormatter(value) {return formatDateHTMLStyle(value as Date)}}
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
              <h1 className="text-5xl font-bold pb-4">Finances</h1>
              <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {}}>Add finance</button>
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