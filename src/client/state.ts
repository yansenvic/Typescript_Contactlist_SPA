import { Render } from "./index";
import { fetchData } from "./fetchData";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
};

export type State = {
  path: string;
  contacts: Contact[];
  favContacts: Contact[];
  searchValue: string;
  searchValueFavorite: string;
  currentPage: number;
  currentPageFavorite: number;
  isLoading: boolean;
  errorMassage: string;
  totalData: number;
};

export let state: State = {
  path: window.location.pathname,
  contacts: [],
  favContacts: JSON.parse(localStorage.getItem("favContacts") ?? "[]"),
  searchValue: "",
  searchValueFavorite: "",
  currentPage: 1,
  currentPageFavorite: 1,
  isLoading: false,
  errorMassage: "",
  totalData: 0,
};

//partial : https://www.typescriptlang.org/docs/handbook/utility-types.html

export function setState(newState: Partial<State>): void {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;
  onStateChange(prevState, nextState);
  Render();
}

let timer: NodeJS.Timeout;

export function onStateChange(prevState: State, nextState: State): void {
  if (prevState.path !== nextState.path) {
    history.pushState(null, "", nextState.path);
  }
  if (prevState.searchValue !== nextState.searchValue) {
    setState({ isLoading: true });
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout((): void => {
      fetchData();
      setState({ isLoading: false, currentPage: 1 });
    }, 500);
  }
  if (prevState.searchValueFavorite !== nextState.searchValueFavorite) {
    setState({ currentPageFavorite: 1 });
  }
  if (prevState.currentPage !== nextState.currentPage) {
    fetchData();
  }
  if (prevState.favContacts !== nextState.favContacts) {
    localStorage.setItem("favContacts", JSON.stringify(nextState.favContacts));
  }
}
