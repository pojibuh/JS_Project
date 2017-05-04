const huntAndKill = function () {
  d3.select("canvas").remove()
  
  var width = 800,
      height = 500;

  var N = 1 << 0,
      S = 1 << 1,
      W = 1 << 2,
      E = 1 << 3;

  var cellSize = 8,
      cellSpacing = 8,
      cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
      cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)),
      cells = new Array(cellWidth * cellHeight),
      frontier = [];

  var canvas = d3.select("section").append("canvas")
      .attr("width", width)
      .attr("height", height);

  var context = canvas.node().getContext("2d");

  context.translate(
    Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
    Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
  );

  context.fillStyle = "white";

  // Add a random cell and two initial edges.
  var start = (cellHeight - 1) * cellWidth;
  cells[start] = 0;
  fillCell(start);
  frontier.push({index: start, direction: N});
  frontier.push({index: start, direction: E});

  d3.timer(function() {
    var done, k = 0;
    while (++k < 20 && !(done = exploreFrontier()));
    return done;
  });
}
