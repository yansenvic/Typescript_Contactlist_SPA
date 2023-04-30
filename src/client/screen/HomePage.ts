import { NavBar } from "../component/NavBar";
import { HeaderText } from "../component/HeaderText";
import { InputText } from "../component/InputText";
import { Button } from "../component/Button";
import { ContactList } from "../component/ContactList";
import { Pages } from "../component/Pages";
import { state, sendAction } from "../state";

export function HomePage() {
  const navBar = NavBar();
  const header = HeaderText("Contact List");
  const input = InputText({
    value: state.searchValue,
    onInput: function (searchValues: string) {
      sendAction({
        type: "CHANGE_SEARCH_VALUE_HOME",
        payload: { searchValue: searchValues },
      });
    },
  });
  const button = Button({
    value: "Clear",
    onClick: () => {
      sendAction({
        type: "CHANGE_SEARCH_VALUE_HOME",
        payload: { searchValue: "" },
      });
    },
  });
  const list = ContactList({
    currentPage: state.currentPage,
    data: state.contacts,
  });
  const page = Pages({
    totalData: state.totalData,
    onChange: function (number: number) {
      sendAction({
        type: "CHANGE_PAGE_HOME",
        payload: { currentPage: number },
      });
    },
  });
  const div = document.createElement("div");
  div.append(navBar, header, input, button);
  if (state.tagScreenHome === "Loading") {
    const loadingText = document.createElement("p");
    loadingText.textContent = "Data is Loading";
    div.append(loadingText);
  } else if (state.tagScreenHome === "Error") {
    const errorText = document.createElement("p");
    errorText.textContent = state.errorMassage;
    div.append(errorText);
  } else if (state.tagScreenHome === "Success") {
    div.append(list, page);
  } else if (state.tagScreenHome === "Empty") {
    const emptyText = document.createElement("p");
    emptyText.textContent = "Data empty";
    div.append(emptyText);
  }
  return div;
}
