import { sendAction } from "../state";

export function Link(props: { pathname: string; label: string }) {
  const link = document.createElement("a");
  link.href = props.pathname;
  link.textContent = props.label;
  link.onclick = function (event) {
    event.preventDefault();
    //@ts-ignore
    const path = new URL(event.target?.href).pathname;
    sendAction({ type: "CHANGE_PATH", payload: { path: path } });
  };
  return link;
}
