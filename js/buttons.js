const switchToBFS = () => {
  document.getElementById("swag").src="js/practiceAlso.js"
  document.getElementById("algo").setAttribute( "onclick", "bfs()" );
}

const switchToDFS = () => {
  document.getElementById("swag").src="js/practice.js"
  document.getElementById("algo").setAttribute( "onclick", "dfs()" );
}
