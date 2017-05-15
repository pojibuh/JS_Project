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
  let swag;

  if (generator === 'prim') {
    swag = new primGenerator(n);
  } else if (generator === 'hk') {
    swag = new hkGenerator(n);
  }
  swag.run();
}


function switchToPrimInfo() {
  let title = document.getElementById("title");
  title.innerText = "Prim's Algorithm"
}

function switchToHKInfo() {
  let title = document.getElementById("title");
  title.innerText = "Hunt-and-Kill Algorithm"
}

const switchToPrim = () => {
  document.getElementById("algo").addEventListener( 'click', () => setupGenerator('prim') );
  switchToPrimInfo();
}

const switchToHK = () => {
  document.getElementById("algo").addEventListener( 'click', () => setupGenerator('hk') );
  switchToHKInfo();
}

document.getElementById("prim").addEventListener( 'click', () => switchToPrim() );
document.getElementById("hk").addEventListener( 'click', () => switchToHK() );
