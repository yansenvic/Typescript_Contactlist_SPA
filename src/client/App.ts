import { HomePage } from "../client/screen/HomePage";
import { FavoritesPage } from "../client/screen/FavoritesPage";
import { state } from "./state";

export function App() {
  const homepage = HomePage();
  const favoritespage = FavoritesPage();
  if (state.path === "/home" || state.path === "/") {
    return homepage;
  } else if (state.path === "/favorites") {
    return favoritespage;
  } else {
    const error = document.createElement("P");
    error.textContent = "Page not Found";
    return error;
  }
}
