const switchToBFS = () => {
  document.getElementById("swag").src="js/bfs.js"
  document.getElementById("algo").setAttribute( "onclick", "bfs()" );
}

const switchToDFS = () => {
  document.getElementById("swag").src="js/dfs.js"
  document.getElementById("algo").setAttribute( "onclick", "dfs()" );
}
