import { formatDateToJS } from "../common/formatDate";

export interface ListData<T> {
  data: Array<T>;
  title: string;
}

export default function ListView(props: any) {
  const listData: ListData<Object> = props.listData;
  const colNames: Array<string> = ["Title", "Content", "Created"];

  const heading = () => {
    return (
      <div className="flex w-full">
        <div className="w-10">
          <h4>Nr.</h4>
        </div>
        {
          colNames.map((colName, index) => {
            return (
              <div className="grow" key={index}>
                <h4>{colName}</h4>
              </div>
            );
          })
        }
      </div>
    );
  }

  const listItem = (data: Object, index: number) => {
    return (
      <div className="flex w-full" key={index}>
        <div className="w-10">
          <h4>{index + 1}.</h4>
        </div>
        {
          colNames.map((colName, i) => {
            console.log(data[colName.toLowerCase()])
            return (
              <div className="grow" key={i}>
                <h4>{colName.toLowerCase() == "created" ? (data[colName.toLowerCase()] as Date).toDateString() : data[colName.toLowerCase()]}</h4>
              </div>
            );
          })
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-4">{listData.title}</h2>
      <div className="flex flex-col">
        {heading()}
        {listData.data.map(
          (data, index) => {
            return listItem(data, index);
          }
        )}
      </div>
    </div>
  );
}