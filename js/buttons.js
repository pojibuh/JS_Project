const switchToPrim = () => {
  document.getElementById("swag").src="js/algos/primGenerator.js"
  document.getElementById("algo").setAttribute( "onclick", "prim()" );
}

const switchToHK = () => {
  document.getElementById("swag").src="js/dfs.js"
  document.getElementById("algo").setAttribute( "onclick", "hk()" );
}
