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
    switchToHKInfo()
    let swag = new hkGenerator(n);
  }
  swag.run();
}


function switchToPrimInfo() {
  let title = document.getElementById("title");
  title.innerText = "Prim's Algorithm"
}

function switchToHKInfo() {
  let title = document.getElementById("title");
  debugger
  title.innerText = "Hunt-and-Kill Algorithm"
}

const switchToPrim = () => {
  switchToPrimInfo();
  document.getElementById("algo").addEventListener( 'click', () => setupGenerator('prim') );
}

const switchToHK = () => {
  switchToHKInfo();
  document.getElementById("algo").addEventListener( 'click', () => setupGenerator('hk') );
}

document.getElementById("prim").addEventListener( 'click', () => switchToPrim() );
document.getElementById("hk").addEventListener( 'click', () => switchToHK() );
