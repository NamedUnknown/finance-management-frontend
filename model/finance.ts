export interface Finance {
  readonly id: number;
  description: string;
  amount: number;
  created: Date | string;
  spentAt: Date | string;
}

export function financeToJSON(finance: Finance) : Object {
  let map = new Map<string,Object>();
  map.set("id", finance.id);
  map.set("description", finance.description);
  map.set("amount", finance.amount);
  map.set("created", finance.created);
  map.set("spentAt", finance.spentAt);
  return Object.fromEntries(map);
}