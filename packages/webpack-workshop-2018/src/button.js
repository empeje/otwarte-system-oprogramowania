// tak a str, the button label and return an element
const makeButton = buttonName => {
  const buttonLabel = `Button: ${buttonName}`;
  const button = document.createElement("button");
  button.innerText = buttonLabel;
  return button
};

export default makeButton;