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
  tagScreenHome: TagScreenHome;
  errorMassage: string;
  totalData: number;
};

export type TagScreenHome = "Idle" | "Loading" | "Success" | "Erorr" | "Empty";

export let state: State = {
  path: window.location.pathname,
  contacts: [],
  favContacts: JSON.parse(localStorage.getItem("favContacts") ?? "[]"),
  searchValue: "",
  searchValueFavorite: "",
  currentPage: 1,
  currentPageFavorite: 1,
  isLoading: false,
  tagScreenHome: "Idle",
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

//penggunaan reduce State
export type Action =
  | { type: "CHANGE_SEARCH_VALUE_HOME"; payload: string }
  | { type: "CHANGE_SEARCH_VALUE_FAVORITE"; payload: string }
  | { type: "CHANGE_PAGE_HOME"; payload: number }
  | { type: "CHANGE_PAGE_FAVORITE"; payload: number }
  | {
      type: "FETCH";
      payload: { loading: boolean; tagScreenHome: TagScreenHome };
    }
  | {
      type: "FETCH_SUCCESS";
      payload: {
        contact: Contact[];
        totalContact: number;
      };
    }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "FETCH_EMPTY" }
  | { type: "CHANGE_FAVORITE_DATA"; payload: Contact[] }
  | { type: "CHANGE_PATH"; payload: string };

//penggunaan reduce State
export function sendAction(action: Action) {
  const newState = reducer(state, action);
  console.log(state);
  setState(newState);
  console.log(state);
}

//penggunaan reduce State
export function reducer(prevState: State, action: Action) {
  switch (action.type) {
    case "CHANGE_SEARCH_VALUE_HOME":
      return {
        ...prevState,
        searchValue: action.payload,
        currentPage: 1,
      };
    case "CHANGE_SEARCH_VALUE_FAVORITE": {
      return {
        ...prevState,
        searchValueFavorite: action.payload,
        currentPageFavorite: 1,
      };
    }
    case "CHANGE_PAGE_HOME":
      return { ...prevState, currentPage: action.payload };
    case "CHANGE_PAGE_FAVORITE":
      return { ...prevState, currentPageFavorite: action.payload };
    case "FETCH": {
      return {
        ...prevState,
        isLoading: action.payload.loading,
        tagScreenHome: action.payload.tagScreenHome,
      };
    }
    case "FETCH_SUCCESS":
      return {
        ...prevState,
        contacts: action.payload.contact,
        totalData: action.payload.totalContact,
        errorMassage: "",
        isLoading: false,
      };
    case "FETCH_ERROR":
      return {
        ...prevState,
        contacts: [],
        totalData: 0,
        errorMassage: action.payload,
        isLoading: false,
      };
    case "FETCH_EMPTY":
      return {
        ...prevState,
        contacts: [],
        totalData: 0,
        errorMassage: "",
        isLoading: false,
      };
    case "CHANGE_FAVORITE_DATA":
      return { ...prevState, favContacts: action.payload };
    case "CHANGE_PATH":
      if (action.payload === "/favorites") {
        return {
          ...prevState,
          path: action.payload,
          currentPageFavorite: 1,
        };
      } else
        return {
          ...prevState,
          path: action.payload,
        };
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
    sendAction({
      type: "FETCH",
      payload: { loading: true, tagScreenHome: "Loading" },
    });
  }
  if (prevState.currentPage !== nextState.currentPage) {
    sendAction({
      type: "FETCH",
      payload: { loading: true, tagScreenHome: "Loading" },
    });
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
