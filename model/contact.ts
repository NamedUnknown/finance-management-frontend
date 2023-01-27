export interface Contact {
  id?: number;
  title: string;
  content: string;
  email: string;
  answer?: string;
  created: string | Date;
  updated?: string | Date;
};

export function contactToJSON(contact: Contact) : Object {
  let map = new Map<string,Object>();
  map.set("id", contact.id);
  map.set("title", contact.title);
  map.set("content", contact.content);
  map.set("email", contact.email);
  map.set("answer", contact.answer);
  map.set("created", contact.created);
  map.set("updated", contact.updated);
  return Object.fromEntries(map);
}