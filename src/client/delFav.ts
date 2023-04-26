import { state, setState } from "./state";

export function delFav(id : number) : void {
  const result = state.favContacts.filter(filterid);
  function filterid(data: { id: number; }) {
    return data.id !== id;
  }
  setState({
    favContacts: result,
  });
}
