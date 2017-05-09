import Maze from "./algos/maze";
import hkGenerator from "./algos/hkGenerator";
import primGenerator from "./algos/primGenerator";

function prim() {
  let el = document.getElementById("swag");
  el.parentNode.removeChild(el);
  let swagga = document.createElement("div");
  swagga.id = "swag";
  let hook = document.getElementById("hook");
  hook.appendChild(swagga)
  let n = new Maze (20, 32);
  let swag = new primGenerator(n);
}

function hk() {
  let el = document.getElementById("swag");
  el.parentNode.removeChild(el);
  let swagga = document.createElement("div");
  swagga.id = "swag";
  let hook = document.getElementById("hook");
  hook.appendChild(swagga)
  let n = new Maze (20, 32);
  let swag = new hkGenerator(n);
}

const switchToPrim = () => {

  document.getElementById("algo").addEventListener( 'click', () => prim() );
}

const switchToHK = () => {

  document.getElementById("algo").addEventListener( 'click', () => hk() );
}

document.getElementById("prim").addEventListener( 'click', () => switchToPrim() );
document.getElementById("hk").addEventListener( 'click', () => switchToHK() );
