import { state, setState, Contact } from "./state";

export function delFav(id: string): void {
  const result = state.favContacts.filter(filterid);
  function filterid(data: Contact) {
    return data.id !== id;
  }
  setState({
    favContacts: result,
  });
}
