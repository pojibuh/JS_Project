import Maze from "./algos/maze";
import hkGenerator from "./algos/hkGenerator";
import primGenerator from "./algos/primGenerator";

function setupGenerator(generator) {
  let el = document.getElementById("swag");
  el.parentNode.removeChild(el);
  let swagga = document.createElement("div");
  swagga.id = "swag";
  let hook = document.getElementById("hook");
  hook.appendChild(swagga)
  let n = new Maze (20, 32);

  if (generator === 'prim') {
    let swag = new primGenerator(n);
  } else if (generator === 'hk') {
    let swag = new hkGenerator(n);
  }
  swag.run();
}


// function switchToPrimInfo() {
//
// }
// function switchToPrimInfo() {
//
// }

const switchToPrim = () => {
  document.getElementById("algo").addEventListener( 'click', () => setupGenerator('prim') );
}

const switchToHK = () => {
  document.getElementById("algo").addEventListener( 'click', () => setupGenerator('hk') );
}

document.getElementById("prim").addEventListener( 'click', () => switchToPrim() );
document.getElementById("hk").addEventListener( 'click', () => switchToHK() );
