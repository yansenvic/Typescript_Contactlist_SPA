import { App } from "./App";
import { onStateChange, state } from "./state";

export function Render() {
  const root : HTMLElement = document.getElementById("root") as HTMLElement;
  const app = App();
  let focusedIdElement;
  let focusedElementSelectionStart;
  let focusedElementSelectionEnd;
  if (document.activeElement.type === "text") {
    focusedIdElement = document.activeElement.id;
    focusedElementSelectionStart = document.activeElement.selectionStart;
    focusedElementSelectionEnd = document.activeElement.selectionEnd;
  }
  root.innerHTML = "";
  root.append(app);
  if (focusedIdElement) {
    const focusedElement = document.getElementById(focusedIdElement);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}

Render();
onStateChange(state, state);
