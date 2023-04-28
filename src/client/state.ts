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

export type Action = {
  type: string;
  payload: string;
  data: Contact[];
  number: number;
  status: boolean;
};

export function sendAction(action: Partial<Action>) {
  const newState = reducer(state, action);
  setState(newState);
}

export function reducer(prevState: State, action: Partial<Action>) {
  switch (action.type) {
    case "CHANGE_SEARCH_VALUE_HOME":
      return {
        ...prevState,
        searchValue: action.payload,
        currentPage: action.number,
      };
    case "CHANGE_SEARCH_VALUE_FAVORITE": {
      return {
        ...prevState,
        searchValueFavorite: action.payload,
        currentPageFavorite: action.number,
      };
    }
    case "CHANGE_PAGE_HOME":
      return { ...prevState, currentPage: action.number };
    case "CHANGE_PAGE_FAVORITE":
      return { ...prevState, currentPageFavorite: action.number };
    case "FETCH": {
      return { ...prevState, isLoading: action.status };
    }
    case "FETCH_SUCCESS":
      return {
        ...prevState,
        contacts: action.data,
        totalData: action.number,
        errorMassage: action.payload,
        isLoading: action.status,
      };
    case "FETCH_ERROR":
      return {
        ...prevState,
        contacts: action.data,
        totalData: action.number,
        errorMassage: action.payload,
        isLoading: action.status,
      };
    case "FETCH_EMPTY":
      return {
        ...prevState,
        contacts: action.data,
        totalData: action.number,
        errorMassage: action.payload,
        isLoading: action.status,
      };
    case "CHANGE_FAVORITE_DATA":
      return { ...prevState, favContacts: action.data };
    case "CHANGE_PATH":
      return { ...prevState, path: action.payload };
    default:
      return { ...prevState };
  }
}

let timer: NodeJS.Timeout;

export function onStateChange(prevState: State, nextState: State): void {
  if (prevState.path !== nextState.path) {
    history.pushState(null, "", nextState.path);
  }
  if (prevState.searchValue !== nextState.searchValue) {
    sendAction({ type: "FETCH", status: true });
  }
  if (prevState.currentPage !== nextState.currentPage) {
    sendAction({ type: "FETCH", status: true });
  }
  if (prevState.isLoading !== nextState.isLoading) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout((): void => {
      fetchData();
    }, 500);
  }
  if (prevState.favContacts !== nextState.favContacts) {
    localStorage.setItem("favContacts", JSON.stringify(nextState.favContacts));
  }
}
