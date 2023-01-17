export interface TableProps<T> {
  data: Array<T>;
  tableFields: Array<string>;
  showEdit: boolean;
  onEditClicked(item: Object): void;
  edit(value: Object, property: string): void;
  showDelete: boolean;
  onDeleteClicked(item: Object): void;
  delete(): Promise<void>;
}