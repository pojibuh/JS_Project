const switchToPrim = () => {
  document.getElementById("swag").src="js/algos/primGenerator.js"
  document.getElementById("algo").setAttribute( "onclick", "prim()" );
}

const switchToHK = () => {
  document.getElementById("swag").src="js/dfs.js"
  document.getElementById("algo").setAttribute( "onclick", "dfs()" );
}

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
