const red = "color: red;";
const blue = "color: blue;";

const makeColorStyle = color => `color ${color}`;

// Tree shaking works for nodejs
export {
  red, blue, makeColorStyle
}