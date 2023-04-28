import { state, setState } from "./state";

export function fetchData(): void {
  const limit = 10;
  const skip = (state.currentPage - 1) * limit;
  //untuk filter yang berasal dari backend hanya bisa dijalankan pada filter firstname dan email
  fetch(
    `https://dummyjson.com/users/search?q=${state.searchValue}&skip=${skip}&limit=${limit}`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      setState({
        contacts: [...data.users],
        totalData: data.total,
        errorMassage: "",
      });
    })
    .catch((err) => {
      setState({ contacts: [], errorMassage: err.message, totalData: 0 });
    })
    .finally(() => setState({ isLoading: false }));
}
