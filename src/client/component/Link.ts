import { setState } from "../state";

export function Link(props: { pathname: string; label: string; }) {
  const link = document.createElement("a");
  link.href = props.pathname;
  link.textContent = props.label;
  link.onclick = function (event) {
    event.preventDefault();
    setState({ path: new URL(event.target.href).pathname });
  };
  return link;
}
