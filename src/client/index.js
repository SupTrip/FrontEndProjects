

import './styles/style.scss';

import {  performAction} from "./js/app";

 //document.getElementById('generate').addEventListener('click',performAction)
window.addEventListener('DOMContentLoaded', _ =>{
	document.getElementById('generate').addEventListener('click',performAction);
});
alert("I EXIST")
console.log("CHANGE!!");

export {
     performAction
    }
