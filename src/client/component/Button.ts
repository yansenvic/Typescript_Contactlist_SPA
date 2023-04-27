export function Button(props: { value: string; onClick: () => void }) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = props.value;
  button.onclick = props.onClick;
  return button;
}
