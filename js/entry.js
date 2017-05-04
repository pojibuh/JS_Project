const dfs = require("./dfs");
const bfs = require("./bfs");

const switchToBFS = () => {

  document.getElementById("algo").addEventListener( 'click', () => bfs() );
}

const switchToDFS = () => {

  document.getElementById("algo").addEventListener( 'click', () => dfs() );
}

document.getElementById("dfs").addEventListener( 'click', () => switchToDFS() );
document.getElementById("bfs").addEventListener( 'click', () => switchToBFS() );
