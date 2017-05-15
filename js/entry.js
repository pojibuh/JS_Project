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
  title.innerText = "Prim's Algorithm";
  let desc = document.getElementById("description");
  desc.innerText = "Prim's algorithm involves choosing an initial vertex"
  + ", then adding all of its neighbors into the 'frontier.'"
  + " From there, the algorithm visits one of the frontier cells, and adds"
  + " its neighbors to the frontier as well. This pattern continues until"
  + " every cell in the grid are visited.";
}

function switchToHKInfo() {
  let title = document.getElementById("title");
  title.innerText = "Hunt-and-Kill Algorithm";
  let desc = document.getElementById("description");
  desc.innerText = "The Hunt-and-Kill algorithm constantly switches between"
  + " the 'Hunt' and 'Kill' phases. The algorithm begins in the kill phase,"
  + " where an initial cell is chosen. Next, a random neighbor of the first cell"
  + " is visited, and this will continue to happen until the algorithm reaches"
  + " a dead end. This triggers the hunt phase, which will scan the grid"
  + " , starting from the top-left, until it finds an unvisited cell with"
  + " at least one visited neighbor. The algorithm toggles between the two"
  + " phases until all cells are visited."
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
