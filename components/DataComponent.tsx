import { FormEvent } from "react";

export default interface DataComponent<T> {
  fetchData(): Promise<void>;
  onEditClicked(item: T): void;
  edit(value: T, property: string): void;
  onDeleteClicked(item: T): void;
  delete(): Promise<void>;
  submit(event: FormEvent): Promise<void>;
}