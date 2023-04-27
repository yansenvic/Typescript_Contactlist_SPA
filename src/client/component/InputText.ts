export function InputText(props: { value: string; onInput: any }) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter Name";
  input.id = "input";
  input.value = props.value;
  input.oninput = function (event) {
    //@ts-ignore
    props.onInput(event.target?.value);
  };
  return input;
}
