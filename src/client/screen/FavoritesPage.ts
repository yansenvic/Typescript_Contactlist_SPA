import { NavBar } from "../component/NavBar";
import { HeaderText } from "../component/HeaderText";
import { InputText } from "../component/InputText";
import { Button } from "../component/Button";
import { ContactList } from "../component/ContactList";
import { Pages } from "../component/Pages";
import { state, Contact, sendAction } from "../state";

export function FavoritesPage() {
  const filterData = filterFavContactslist();
  const navBar = NavBar();
  const header = HeaderText("Favorite Contact List");
  const input = InputText({
    value: state.searchValueFavorite,
    onInput: function (searchValues: string) {
      sendAction({
        type: "CHANGE_SEARCH_VALUE_FAVORITE",
        payload: searchValues,
      });
    },
  });
  const button = Button({
    value: "Clear",
    onClick: () => {
      sendAction({
        type: "CHANGE_SEARCH_VALUE_FAVORITE",
        payload: "",
      });
    },
  });
  const list = ContactList({
    currentPage: state.currentPageFavorite,
    data: filterData,
  });
  const page = Pages({
    totalData: state.favContacts.filter(filterName).length,
    onChange: function (number: number) {
      sendAction({ type: "CHANGE_PAGE_FAVORITE", payload: number });
    },
  });
  const div = document.createElement("div");
  div.append(navBar, header, input, button);
  if (filterFavContactslist().length > 0) {
    div.append(list, page);
  } else {
    const emptyText = document.createElement("p");
    emptyText.textContent = "Data empty";
    div.append(emptyText);
  }
  return div;
}

function filterFavContactslist() {
  const limit = 10;
  const items = state.favContacts.filter(filterName);
  return [
    ...items.slice(
      (state.currentPageFavorite - 1) * limit,
      state.currentPageFavorite * limit
    ),
  ];
}

function filterName(item: Contact) {
  const fullname: string =
    `${item.firstName} ${item.maidenName} ${item.lastName}`.toLowerCase();
  return fullname.match(state.searchValueFavorite.toLowerCase());
}
