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

  kill(grid) {
    let nextCellCoords = this.pickDirection();

    if (nextCellCoords === null) {
      return null;
    } else {
      this.currentCell = grid[nextCellCoords[0]][nextCellCoords[1]];
      this.currentCell.visit();
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

  render() {
    let currentGrid = [];
    this.grid.forEach((row) => {
      let newRow = [];
      row.forEach((cell) => {
        if (cell.visited === true) {
          newRow.push("X");
        } else {
          newRow.push(" ");
        }
      })
      currentGrid.push(newRow);
    })
    console.log(currentGrid[0]);
    console.log(currentGrid[1]);
    console.log(currentGrid[2]);
    console.log(currentGrid[3]);
    console.log(currentGrid[4]);
    console.log("-------------");
  }

  run() {
    let loop = true;
    while(loop === true) {
      this.render();
      let kill = this.kill(this.grid);
      let hunt;
      if (kill === null) {
        hunt = this.hunt(this.maze);
        this.render();
      }

      if (kill === null && hunt === null) {
        loop = false;
      }
    }
  }
}
