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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maze = __webpack_require__(4);

var _maze2 = _interopRequireDefault(_maze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hkGenerator = function () {
  function hkGenerator(maze) {
    _classCallCheck(this, hkGenerator);

    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
  }

  _createClass(hkGenerator, [{
    key: "randomize",
    value: function randomize(num) {
      return Math.floor(Math.random() * num);
    }
  }, {
    key: "pickDirection",
    value: function pickDirection() {
      var currCellNeighbors = this.getNeighbors(this.currentCell);
      var unvisitedNeighbors = currCellNeighbors.filter(function (neighbor) {
        return neighbor.visited === false;
      });

      if (unvisitedNeighbors.length >= 1) {
        var chosenNeighbor = unvisitedNeighbors[this.randomize(unvisitedNeighbors.length)];
        return [chosenNeighbor.x, chosenNeighbor.y];
      } else {
        return null;
      }
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(cell) {
      var _this = this;

      var neighbors = [];
      var n = [[cell.n[0]], [cell.n[1]]];
      var w = [[cell.w[0]], [cell.w[1]]];
      var e = [[cell.e[0]], [cell.e[1]]];
      var s = [[cell.s[0]], [cell.s[1]]];

      [n, e, w, s].forEach(function (direction) {
        if (_this.maze.validPosition(direction)) {
          neighbors.push(_this.grid[direction[0]][direction[1]]);
        }
      });

      return neighbors;
    }
  }, {
    key: "connectNeighbor",
    value: function connectNeighbor(cell, neighbors) {
      var chosenNeighbor = void 0;
      var visitedNeighbors = neighbors.filter(function (neighbor) {
        return neighbor.visited === true;
      });
      if (visitedNeighbors.length === 1) {
        chosenNeighbor = visitedNeighbors[0];
      } else if (visitedNeighbors.length > 1) {
        chosenNeighbor = visitedNeighbors[this.randomize(visitedNeighbors.length)];
      }

      this.removeBorder(cell, chosenNeighbor);
    }
  }, {
    key: "hunt",
    value: function hunt(maze) {
      var neighbors = void 0;
      var visited = [];
      var i = 0;
      var j = 0;
      var foundNewCell = false;

      while (!foundNewCell && i < maze.dimX) {
        j = 0;
        while (!foundNewCell && j < maze.dimY) {
          var cell = this.grid[i][j];
          neighbors = this.getNeighbors(cell);
          if (cell.visited === false && this.hasVisitedNeighbor(neighbors)) {
            this.currentCell = cell;
            this.currentCell.visit();
            this.connectNeighbor(cell, neighbors);
            foundNewCell = true;
            visited.push(cell);
          } else {
            visited.push(cell);
          }
          j += 1;
        }
        i += 1;
      }

      if (visited.length === maze.dimX * maze.dimY) {
        return null;
      } else {
        return visited.length;
      }
    }
  }, {
    key: "hasVisitedNeighbor",
    value: function hasVisitedNeighbor(neighbors) {
      var count = 0;
      neighbors.forEach(function (neighbor) {
        if (neighbor.visited === true) {
          count++;
        }
      });

      if (count > 0) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "removeBorder",
    value: function removeBorder(oldCell, newCell) {
      if (oldCell.n[0] === newCell.x && oldCell.n[1] === newCell.y) {
        newCell.addClass("remove-bottom");
      } else if (oldCell.e[0] === newCell.x && oldCell.e[1] === newCell.y) {
        oldCell.addClass("remove-right");
      } else if (oldCell.w[0] === newCell.x && oldCell.w[1] === newCell.y) {
        newCell.addClass("remove-right");
      } else if (oldCell.s[0] === newCell.x && oldCell.s[1] === newCell.y) {
        oldCell.addClass("remove-bottom");
      }
    }
  }, {
    key: "kill",
    value: function kill(grid) {
      var nextCellCoords = this.pickDirection();

      if (nextCellCoords === null) {
        return null;
      } else {
        var formerCell = this.currentCell;
        this.currentCell = grid[nextCellCoords[0]][nextCellCoords[1]];
        this.currentCell.visit();
        this.removeBorder(formerCell, this.currentCell);
        var neighbors = this.getNeighbors(this.currentCell);
        var unvisited = [];
        neighbors.forEach(function (neighbor) {
          if (neighbor.visited === false) {
            unvisited.push(neighbor);
          }
        });
        if (unvisited.length === 0) {
          return null;
        } else {
          return -1;
        }
      }
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      var kill = this.kill(this.grid);
      var hunt = void 0;
      if (kill === null) {
        hunt = this.hunt(this.maze);
      }
      if (kill === null && hunt === null) {
        return;
      }
      setTimeout(function () {
        _this2.run();
      }, 5);
    }
  }]);

  return hkGenerator;
}();

exports.default = hkGenerator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maze = __webpack_require__(4);

var _maze2 = _interopRequireDefault(_maze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var primGenerator = function () {
  function primGenerator(maze) {
    _classCallCheck(this, primGenerator);

    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
    this.frontier = this.getNeighbors(this.currentCell);
  }

  _createClass(primGenerator, [{
    key: "randomize",
    value: function randomize(num) {
      return Math.floor(Math.random() * num);
    }
  }, {
    key: "shuffleFrontier",
    value: function shuffleFrontier() {
      var i = 0;
      var j = 0;
      var temp = null;

      for (i = this.frontier.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this.frontier[i];
        this.frontier[i] = this.frontier[j];
        this.frontier[j] = temp;
      }
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(cell) {
      var _this = this;

      var neighbors = [];
      var n = [[cell.n[0]], [cell.n[1]]];
      var w = [[cell.w[0]], [cell.w[1]]];
      var e = [[cell.e[0]], [cell.e[1]]];
      var s = [[cell.s[0]], [cell.s[1]]];

      [n, e, w, s].forEach(function (direction) {
        if (_this.maze.validPosition(direction)) {
          neighbors.push(_this.grid[direction[0]][direction[1]]);
        }
      });

      return neighbors;
    }
  }, {
    key: "connectNeighbor",
    value: function connectNeighbor(cell) {
      //pick neighbor to connect with after hunting cell down
      var chosenNeighbor = void 0;
      var visitedNeighbors = this.getNeighbors(cell).filter(function (neighbor) {
        return neighbor.visited === true;
      });
      if (visitedNeighbors.length === 1) {
        chosenNeighbor = visitedNeighbors[0];
      } else if (visitedNeighbors.length > 1) {
        chosenNeighbor = visitedNeighbors[this.randomize(visitedNeighbors.length)];
      }
      // debugger
      this.removeBorder(cell, chosenNeighbor);
    }
  }, {
    key: "removeBorder",
    value: function removeBorder(oldCell, newCell) {
      if (oldCell.n[0] === newCell.x && oldCell.n[1] === newCell.y) {
        newCell.addClass("remove-bottom");
      } else if (oldCell.e[0] === newCell.x && oldCell.e[1] === newCell.y) {
        oldCell.addClass("remove-right");
      } else if (oldCell.w[0] === newCell.x && oldCell.w[1] === newCell.y) {
        newCell.addClass("remove-right");
      } else if (oldCell.s[0] === newCell.x && oldCell.s[1] === newCell.y) {
        oldCell.addClass("remove-bottom");
      }
    }
  }, {
    key: "addToFrontier",
    value: function addToFrontier() {
      var _this2 = this;

      var currCellNeighbors = this.getNeighbors(this.currentCell);
      currCellNeighbors.forEach(function (neighbor) {
        if (!_this2.frontier.includes(neighbor) && neighbor.visited === false) {
          _this2.frontier.push(neighbor);
        }
      });
    }
  }, {
    key: "run",
    value: function run() {
      var _this3 = this;

      if (this.frontier.length === 0) {
        return;
      }
      this.shuffleFrontier();
      this.currentCell = this.frontier.pop();
      this.currentCell.visit();
      this.connectNeighbor(this.currentCell);
      this.addToFrontier();
      setTimeout(function () {
        _this3.run();
      }, 5);
    }
  }]);

  return primGenerator;
}();

exports.default = primGenerator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _maze = __webpack_require__(4);

var _maze2 = _interopRequireDefault(_maze);

var _hkGenerator = __webpack_require__(0);

var _hkGenerator2 = _interopRequireDefault(_hkGenerator);

var _primGenerator = __webpack_require__(1);

var _primGenerator2 = _interopRequireDefault(_primGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prim() {
  var el = document.getElementById("swag");
  el.parentNode.removeChild(el);
  var swagga = document.createElement("div");
  swagga.id = "swag";
  var hook = document.getElementById("hook");
  hook.appendChild(swagga);
  var n = new _maze2.default(20, 32);
  var swag = new _primGenerator2.default(n);
  swag.run();
}

function hk() {
  var el = document.getElementById("swag");
  el.parentNode.removeChild(el);
  var swagga = document.createElement("div");
  swagga.id = "swag";
  var hook = document.getElementById("hook");
  hook.appendChild(swagga);
  var n = new _maze2.default(20, 32);
  var swag = new _hkGenerator2.default(n);
  swag.run();
}

var switchToPrim = function switchToPrim() {
  document.getElementById("algo").addEventListener('click', function () {
    return prim();
  });
};

var switchToHK = function switchToHK() {
  document.getElementById("algo").addEventListener('click', function () {
    return hk();
  });
};

document.getElementById("prim").addEventListener('click', function () {
  return switchToPrim();
});
document.getElementById("hk").addEventListener('click', function () {
  return switchToHK();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(x, y, li) {
    _classCallCheck(this, Cell);

    this.x = x;
    this.y = y;
    this.visited = false;
    this.n = [this.x - 1, this.y];
    this.e = [this.x, this.y + 1];
    this.w = [this.x, this.y - 1];
    this.s = [this.x + 1, this.y];
    this.li = li;
  }

  _createClass(Cell, [{
    key: "visit",
    value: function visit() {
      this.visited = true;
      this.li.className = "visited";
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this.li.className += " " + className;
    }
  }, {
    key: "visited",
    value: function visited() {
      return this.visited;
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(3);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze(dimX, dimY) {
    _classCallCheck(this, Maze);

    this.dimX = dimX;
    this.dimY = dimY;
    this.grid = this.blankGrid(dimX, dimY);
  }

  _createClass(Maze, [{
    key: "blankGrid",
    value: function blankGrid(dimX, dimY) {
      var grid = [];
      var swag = document.getElementById("swag");
      var rowUl = void 0;
      var rowLi = void 0;

      for (var i = 0; i < dimX; i++) {
        var row = [];
        rowUl = document.createElement("ul");
        for (var j = 0; j < dimY; j++) {
          rowLi = document.createElement("li");
          rowLi.className = "unvisited";
          row.push(new _cell2.default(i, j, rowLi));
          rowUl.appendChild(rowLi);
        }
        grid.push(row);
        swag.appendChild(rowUl);
      }

      return grid;
    }
  }, {
    key: "validPosition",
    value: function validPosition(coord) {
      return coord[0] >= 0 && coord[0] < this.dimX && coord[1] >= 0 && coord[1] < this.dimY;
    }
  }]);

  return Maze;
}();

exports.default = Maze;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map