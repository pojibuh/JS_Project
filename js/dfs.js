const dfs = function () {
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
      cells = new Array(cellWidth * cellHeight), // each cell’s edge bits
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

  // Explore the frontier until the tree spans the graph.
  d3.timer(function() {
    var done, k = 0;
    while (++k < 50 && !(done = exploreFrontier()));
    return done;
  });

  function exploreFrontier() {
    if ((edge = frontier.pop()) == null) return true;

    var edge,
        i0 = edge.index,
        d0 = edge.direction,
        i1 = i0 + (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1),
        x0 = i0 % cellWidth,
        y0 = i0 / cellWidth | 0,
        x1,
        y1,
        d1,
        open = cells[i1] == null; // opposite not yet part of the maze

    context.fillStyle = open ? "white" : "black";
    if (d0 === N) fillSouth(i1), x1 = x0, y1 = y0 - 1, d1 = S;
    else if (d0 === S) fillSouth(i0), x1 = x0, y1 = y0 + 1, d1 = N;
    else if (d0 === W) fillEast(i1), x1 = x0 - 1, y1 = y0, d1 = E;
    else fillEast(i0), x1 = x0 + 1, y1 = y0, d1 = W;

    if (open) {
      fillCell(i1);
      cells[i0] |= d0, cells[i1] |= d1;
      context.fillStyle = "blue";

      var m = 0;
      if (y1 > 0 && cells[i1 - cellWidth] == null) fillSouth(i1 - cellWidth), frontier.push({index: i1, direction: N}), ++m;
      if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) fillSouth(i1), frontier.push({index: i1, direction: S}), ++m;
      if (x1 > 0 && cells[i1 - 1] == null) fillEast(i1 - 1), frontier.push({index: i1, direction: W}), ++m;
      if (x1 < cellWidth - 1 && cells[i1 + 1] == null) fillEast(i1), frontier.push({index: i1, direction: E}), ++m;
      shuffle(frontier, frontier.length - m, frontier.length);
    }
  }

  function fillCell(index) {
    var i = index % cellWidth, j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
  }

  function fillEast(index) {
    var i = index % cellWidth, j = index / cellWidth | 0;
    context.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSpacing, cellSize);
  }

  function fillSouth(index) {
    var i = index % cellWidth, j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
  }

  function shuffle(array, i0, i1) {
    var m = i1 - i0, t, i, j;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
    }
    return array;
  }

  d3.select(self.frameElement).style("height", height + "px");

};

module.exports = dfs;
