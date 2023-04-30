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
  tagScreenHome: TagScreenHome;
  errorMassage: string;
  totalData: number;
};

export type TagScreenHome = "Idle" | "Loading" | "Success" | "Error" | "Empty";

export let state: State = {
  path: window.location.pathname,
  contacts: [],
  favContacts: JSON.parse(localStorage.getItem("favContacts") ?? "[]"),
  searchValue: "",
  searchValueFavorite: "",
  currentPage: 1,
  currentPageFavorite: 1,
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
  | { type: "CHANGE_SEARCH_VALUE_HOME"; payload: { searchValue: string } }
  | {
      type: "CHANGE_SEARCH_VALUE_FAVORITE";
      payload: { searchValueFavorite: string };
    }
  | { type: "CHANGE_PAGE_HOME"; payload: { currentPage: number } }
  | { type: "CHANGE_PAGE_FAVORITE"; payload: { currentPageFavorite: number } }
  | { type: "FETCH"; payload: { tagScreenHome: TagScreenHome } }
  | {
      type: "FETCH_SUCCESS";
      payload: {
        contact: Contact[];
        totalContact: number;
        tagScreenHome: TagScreenHome;
      };
    }
  | {
      type: "FETCH_ERROR";
      payload: { message: string; tagScreenHome: TagScreenHome };
    }
  | { type: "FETCH_EMPTY"; payload: { tagScreenHome: TagScreenHome } }
  | { type: "CHANGE_FAVORITE_DATA"; payload: { contacts: Contact[] } }
  | { type: "CHANGE_PATH"; payload: { path: string } };

//penggunaan reduce State
export function sendAction(action: Action) {
  const newState = reducer(state, action);
  setState(newState);
}

//penggunaan reduce State
export function reducer(prevState: State, action: Action) {
  switch (prevState.tagScreenHome) {
    case "Idle": {
      switch (action.type) {
        case "FETCH":
          return {
            ...prevState,
            tagScreenHome: action.payload.tagScreenHome,
          };
        case "CHANGE_PATH": {
          if (action.payload.path === "/favorites") {
            return {
              ...prevState,
              path: action.payload.path,
              currentPageFavorite: 1,
            };
          } else
            return {
              ...prevState,
              path: action.payload.path,
            };
        }
        case "CHANGE_SEARCH_VALUE_HOME": {
          return {
            ...prevState,
            searchValue: action.payload.searchValue,
            currentPage: 1,
          };
        }
        case "CHANGE_SEARCH_VALUE_FAVORITE": {
          return {
            ...prevState,
            searchValueFavorite: action.payload.searchValueFavorite,
            currentPageFavorite: 1,
          };
        }
        default:
          return { ...prevState };
      }
    }
    case "Loading": {
      switch (action.type) {
        case "FETCH_SUCCESS": {
          return {
            ...prevState,
            contacts: action.payload.contact,
            totalData: action.payload.totalContact,
            errorMassage: "",
            tagScreenHome: action.payload.tagScreenHome,
          };
        }
        case "FETCH_EMPTY": {
          return {
            ...prevState,
            contacts: [],
            totalData: 0,
            errorMassage: "",
            tagScreenHome: action.payload.tagScreenHome,
          };
        }
        case "FETCH_ERROR": {
          return {
            ...prevState,
            contacts: [],
            totalData: 0,
            errorMassage: action.payload.message,
            tagScreenHome: action.payload.tagScreenHome,
          };
        }
        case "CHANGE_PATH": {
          if (action.payload.path === "/favorites") {
            return {
              ...prevState,
              path: action.payload.path,
              currentPageFavorite: 1,
            };
          } else
            return {
              ...prevState,
              path: action.payload.path,
            };
        }
        case "CHANGE_SEARCH_VALUE_HOME": {
          return {
            ...prevState,
            searchValue: action.payload.searchValue,
            currentPage: 1,
          };
        }
        case "CHANGE_SEARCH_VALUE_FAVORITE": {
          return {
            ...prevState,
            searchValueFavorite: action.payload.searchValueFavorite,
            currentPageFavorite: 1,
          };
        }
        default:
          return { ...prevState };
      }
    }
    case "Success": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tagScreenHome: action.payload.tagScreenHome,
          };
        }
        case "CHANGE_PATH": {
          if (action.payload.path === "/favorites") {
            return {
              ...prevState,
              path: action.payload.path,
              currentPageFavorite: 1,
            };
          } else
            return {
              ...prevState,
              path: action.payload.path,
            };
        }
        case "CHANGE_SEARCH_VALUE_HOME": {
          return {
            ...prevState,
            searchValue: action.payload.searchValue,
            currentPage: 1,
          };
        }
        case "CHANGE_SEARCH_VALUE_FAVORITE": {
          return {
            ...prevState,
            searchValueFavorite: action.payload.searchValueFavorite,
            currentPageFavorite: 1,
          };
        }
        case "CHANGE_PAGE_HOME": {
          return { ...prevState, currentPage: action.payload.currentPage };
        }
        case "CHANGE_PAGE_FAVORITE": {
          return {
            ...prevState,
            currentPageFavorite: action.payload.currentPageFavorite,
          };
        }
        case "CHANGE_FAVORITE_DATA": {
          return { ...prevState, favContacts: action.payload.contacts };
        }
        default:
          return { ...prevState };
      }
    }
    case "Empty": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tagScreenHome: action.payload.tagScreenHome,
          };
        }
        case "CHANGE_PATH": {
          if (action.payload.path === "/favorites") {
            return {
              ...prevState,
              path: action.payload.path,
              currentPageFavorite: 1,
            };
          } else
            return {
              ...prevState,
              path: action.payload.path,
            };
        }
        case "CHANGE_SEARCH_VALUE_HOME": {
          return {
            ...prevState,
            searchValue: action.payload.searchValue,
            currentPage: 1,
          };
        }
        case "CHANGE_SEARCH_VALUE_FAVORITE": {
          return {
            ...prevState,
            searchValueFavorite: action.payload.searchValueFavorite,
            currentPageFavorite: 1,
          };
        }
        default:
          return { ...prevState };
      }
    }
    case "Error": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tagScreenHome: action.payload.tagScreenHome,
          };
        }
        case "CHANGE_PATH": {
          if (action.payload.path === "/favorites") {
            return {
              ...prevState,
              path: action.payload.path,
              currentPageFavorite: 1,
            };
          } else
            return {
              ...prevState,
              path: action.payload.path,
            };
        }
        case "CHANGE_SEARCH_VALUE_HOME": {
          return {
            ...prevState,
            searchValue: action.payload.searchValue,
            currentPage: 1,
          };
        }
        case "CHANGE_SEARCH_VALUE_FAVORITE": {
          return {
            ...prevState,
            searchValueFavorite: action.payload.searchValueFavorite,
            currentPageFavorite: 1,
          };
        }
        default:
          return { ...prevState };
      }
    }
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
    sendAction({ type: "FETCH", payload: { tagScreenHome: "Loading" } });
  }
  if (prevState.currentPage !== nextState.currentPage) {
    sendAction({ type: "FETCH", payload: { tagScreenHome: "Loading" } });
  }
  if (
    prevState.tagScreenHome !== "Loading" &&
    nextState.tagScreenHome === "Loading"
  ) {
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
