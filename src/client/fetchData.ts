import { state, sendAction } from "./state";

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
      if (data.users.length === 0) {
        sendAction({
          type: "FETCH_EMPTY",
          data: [],
          payload: "",
          number: 0,
          status: false,
        });
      } else {
        sendAction({
          type: "FETCH_SUCCESS",
          data: [...data.users],
          payload: "",
          number: data.total,
          status: false,
        });
      }
    })
    .catch((err) => {
      sendAction({
        type: "FETCH_ERROR",
        data: [],
        payload: err.message,
        number: 0,
        status: false,
      });
    });
}
