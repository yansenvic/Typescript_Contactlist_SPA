import { App } from "./App";
import { sendAction } from "./state";

export function Render() {
  const root: HTMLElement | null = document.getElementById("root");
  if (root) {
    const app: HTMLElement = App();
    let focusedIdElement;
    let focusedElementSelectionStart: number | null = null;
    let focusedElementSelectionEnd: number | null = null;
    if (document.activeElement) {
      focusedIdElement = document.activeElement.id;
      if (document.activeElement instanceof HTMLInputElement) {
        focusedElementSelectionStart = document.activeElement.selectionStart;
        focusedElementSelectionEnd = document.activeElement.selectionEnd;
      }
    }
    root.innerHTML = "";
    root.append(app);
    if (focusedIdElement) {
      const focusedElement = document.getElementById(focusedIdElement);
      if (focusedElement) {
        focusedElement.focus();
        if (focusedElement instanceof HTMLInputElement) {
          focusedElement.selectionStart = focusedElementSelectionStart;
          focusedElement.selectionEnd = focusedElementSelectionEnd;
        }
      }
    }
  }
}

Render();
//@ts-ignore
// onStateChange({}, state);
sendAction({ type: "FETCH", payload: "Loading" });
