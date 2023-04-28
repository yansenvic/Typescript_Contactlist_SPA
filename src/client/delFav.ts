import { state, Contact, sendAction } from "./state";

export function delFav(id: string): void {
  const result = state.favContacts.filter(filterid);
  function filterid(data: Contact) {
    return data.id !== id;
  }
  sendAction({ type: "CHANGE_FAVORITE_DATA", payload: result });
}
