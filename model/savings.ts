export interface Savings {
  readonly id: number;
  place: string;
  amount: number;
  created: Date | string;
}

export function savingsToJSON(savings: Savings) : Object {
  let map = new Map<string,Object>();
  map.set("id", savings.id);
  map.set("place", savings.place);
  map.set("amount", savings.amount);
  map.set("created", savings.created);
  return Object.fromEntries(map);
}