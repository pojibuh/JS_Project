class hkGenerator {

  constructor(maze) {
    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
    this.run();
  }

  randomize(num) {
    return Math.floor(Math.random() * num)
  }

  pickDirection() {
    let currCellNeighbors = this.getNeighbors(this.currentCell);
    let unvisitedNeighbors = currCellNeighbors.filter((neighbor) => {
      return neighbor.visited === false;
    });

    if (unvisitedNeighbors.length >= 1) {
      let chosenNeighbor = unvisitedNeighbors[this.randomize(unvisitedNeighbors.length)];
      return [chosenNeighbor.x, chosenNeighbor.y];
    } else {
      return null;
    }
  }

  getNeighbors(cell) {
    let neighbors = [];
    let n = [[cell.n[0]],[cell.n[1]]];
    let w = [[cell.w[0]],[cell.w[1]]];
    let e = [[cell.e[0]],[cell.e[1]]];
    let s = [[cell.s[0]],[cell.s[1]]];

    [n, e, w, s].forEach((direction) => {
      if (this.maze.validPosition(direction)) {
        neighbors.push(this.grid[direction[0]][direction[1]]);
      }
    })

    return neighbors;
  }

  connectNeighbor(cell, neighbors) {
    let chosenNeighbor;
    let visitedNeighbors = neighbors.filter((neighbor) => {
      return neighbor.visited === true;
    });
    if (visitedNeighbors.length === 1) {
      chosenNeighbor = visitedNeighbors[0];
    } else if (visitedNeighbors.length > 1) {
      chosenNeighbor = visitedNeighbors[this.randomize(visitedNeighbors.length)]
    }

    this.removeBorder(cell, chosenNeighbor);
  }

  hunt(maze) {
    let neighbors;
    let visited = [];
    let i = 0;
    let j = 0;
    let foundNewCell = false;

    while(!foundNewCell && i < maze.dimX) {
      j = 0;
      while(!foundNewCell && j < maze.dimY) {
        let cell = this.grid[i][j];
        neighbors = this.getNeighbors(cell);
        if (cell.visited === false && this.hasVisitedNeighbor(neighbors)) {
          this.currentCell = cell;
          this.currentCell.visit();
          this.connectNeighbor(cell, neighbors)
          foundNewCell = true;
          visited.push(cell);
        } else {
          visited.push(cell);
        }
        j += 1;
      }
      i += 1;
    }

    if (visited.length === (maze.dimX * maze.dimY)) {
      return null;
    } else {
      return visited.length;
    }
  }

  hasVisitedNeighbor(neighbors) {
    let count = 0;
    neighbors.forEach((neighbor) => {
      if (neighbor.visited === true) {
        count++;
      }
    })

    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }

  removeBorder(oldCell, newCell) {
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

  kill(grid) {
    let nextCellCoords = this.pickDirection();

    if (nextCellCoords === null) {
      return null;
    } else {
      let formerCell = this.currentCell;
      this.currentCell = grid[nextCellCoords[0]][nextCellCoords[1]];
      this.currentCell.visit();
      this.removeBorder(formerCell, this.currentCell);
      let neighbors = this.getNeighbors(this.currentCell);
      let unvisited = [];
      neighbors.forEach((neighbor) => {
        if(neighbor.visited === false) {
          unvisited.push(neighbor);
        }
      })
      if(unvisited.length === 0) {
        return null;
      } else {
        return -1;
      }
    }
  }

  run() {
    let kill = this.kill(this.grid);
    let hunt;
    if (kill === null) {
      hunt = this.hunt(this.maze);
    }
    if (kill === null && hunt === null) { return; }
    setTimeout(() => {
      this.run();
    }, 5)
  }
}
