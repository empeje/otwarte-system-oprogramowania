import cssFooter from "./footer.css"
import cssButton from "./button.css"

import randomImage from './images.jpg'
import makeImage from './images'
import nav from './nav';
import {footer} from './footer'
import makeButton from './button'
import {makeColorStyle} from './button-styles'

const button = makeButton('Yay! A button!');
button.style = makeColorStyle('cyan');
document.body.appendChild(button);
document.body.appendChild(footer);
document.body.appendChild(makeImage(randomImage));

console.log('test');
console.log(nav());
console.log(top);
console.log(makeButton('makan'));
console.log(makeColorStyle('red'));