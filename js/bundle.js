/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bfs = function bfs() {
  d3.select("canvas").remove();

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

  var canvas = d3.select("section").append("canvas").attr("width", width).attr("height", height);

  var context = canvas.node().getContext("2d");

  context.translate(Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2), Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2));

  context.fillStyle = "white";

  // Add a random cell and two initial edges.
  var start = (cellHeight - 1) * cellWidth;
  cells[start] = 0;
  fillCell(start);
  frontier.push({ index: start, direction: N });
  frontier.push({ index: start, direction: E });

  // Explore the frontier until the tree spans the graph.
  d3.timer(function () {
    var done,
        k = 0;
    while (++k < 20 && !(done = exploreFrontier())) {}
    return done;
  });

  function exploreFrontier() {
    if ((edge = popRandom(frontier)) == null) return true;

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
    if (d0 === N) fillSouth(i1), x1 = x0, y1 = y0 - 1, d1 = S;else if (d0 === S) fillSouth(i0), x1 = x0, y1 = y0 + 1, d1 = N;else if (d0 === W) fillEast(i1), x1 = x0 - 1, y1 = y0, d1 = E;else fillEast(i0), x1 = x0 + 1, y1 = y0, d1 = W;

    if (open) {
      fillCell(i1);
      cells[i0] |= d0, cells[i1] |= d1;
      context.fillStyle = "blue";
      if (y1 > 0 && cells[i1 - cellWidth] == null) fillSouth(i1 - cellWidth), frontier.push({ index: i1, direction: N });
      if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) fillSouth(i1), frontier.push({ index: i1, direction: S });
      if (x1 > 0 && cells[i1 - 1] == null) fillEast(i1 - 1), frontier.push({ index: i1, direction: W });
      if (x1 < cellWidth - 1 && cells[i1 + 1] == null) fillEast(i1), frontier.push({ index: i1, direction: E });
    }
  }

  function fillCell(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
  }

  function fillEast(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSpacing, cellSize);
  }

  function fillSouth(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
  }

  function popRandom(array) {
    if (!array.length) return;
    var n = array.length,
        i = Math.random() * n | 0,
        t;
    t = array[i], array[i] = array[n - 1], array[n - 1] = t;
    return array.pop();
  }

  d3.select(self.frameElement).style("height", height + "px");
};

module.exports = bfs;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dfs = function dfs() {
  d3.select("canvas").remove();

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

  var canvas = d3.select("section").append("canvas").attr("width", width).attr("height", height);

  var context = canvas.node().getContext("2d");

  context.translate(Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2), Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2));

  context.fillStyle = "white";

  // Add a random cell and two initial edges.
  var start = (cellHeight - 1) * cellWidth;
  cells[start] = 0;
  fillCell(start);
  frontier.push({ index: start, direction: N });
  frontier.push({ index: start, direction: E });

  // Explore the frontier until the tree spans the graph.
  d3.timer(function () {
    var done,
        k = 0;
    while (++k < 5 && !(done = exploreFrontier())) {}
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
    if (d0 === N) fillSouth(i1), x1 = x0, y1 = y0 - 1, d1 = S;else if (d0 === S) fillSouth(i0), x1 = x0, y1 = y0 + 1, d1 = N;else if (d0 === W) fillEast(i1), x1 = x0 - 1, y1 = y0, d1 = E;else fillEast(i0), x1 = x0 + 1, y1 = y0, d1 = W;

    if (open) {
      fillCell(i1);
      cells[i0] |= d0, cells[i1] |= d1;
      context.fillStyle = "blue";

      var m = 0;
      if (y1 > 0 && cells[i1 - cellWidth] == null) fillSouth(i1 - cellWidth), frontier.push({ index: i1, direction: N }), ++m;
      if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) fillSouth(i1), frontier.push({ index: i1, direction: S }), ++m;
      if (x1 > 0 && cells[i1 - 1] == null) fillEast(i1 - 1), frontier.push({ index: i1, direction: W }), ++m;
      if (x1 < cellWidth - 1 && cells[i1 + 1] == null) fillEast(i1), frontier.push({ index: i1, direction: E }), ++m;
      shuffle(frontier, frontier.length - m, frontier.length);
    }
  }

  function fillCell(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
  }

  function fillEast(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSpacing, cellSize);
  }

  function fillSouth(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
  }

  function shuffle(array, i0, i1) {
    var m = i1 - i0,
        t,
        i,
        j;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
    }
    return array;
  }

  d3.select(self.frameElement).style("height", height + "px");
};

module.exports = dfs;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dfs = __webpack_require__(1);
var bfs = __webpack_require__(0);

var switchToBFS = function switchToBFS() {

  document.getElementById("algo").addEventListener('click', function () {
    return bfs();
  });
};

var switchToDFS = function switchToDFS() {

  document.getElementById("algo").addEventListener('click', function () {
    return dfs();
  });
};

document.getElementById("dfs").addEventListener('click', function () {
  return switchToDFS();
});
document.getElementById("bfs").addEventListener('click', function () {
  return switchToBFS();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map