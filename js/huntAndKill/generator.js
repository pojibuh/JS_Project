class Generator {

  constructor(maze) {
    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
    this.run();
  }

  pickDirection() {
    let directions = [
      this.currentCell.n,
      this.currentCell.e,
      this.currentCell.w,
      this.currentCell.s
    ]
    return directions[this.randomize(4)]
  }

  randomize(num) {
    return Math.floor(Math.random() * num)
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
      console.log(`I is ${i}`);
      console.log(`J is ${j}`);
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
      //debugger
    }

    //debugger
    if (visited.length === (maze.dimX * maze.dimY)) {
      return null;
    } else {
      console.log(visited.length)
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
    //prevent things from ending up here infinitely
    while(this.maze.validPosition(nextCellCoords) === false || grid[nextCellCoords[0]][nextCellCoords[1]].visited === true) {
      debugger
      nextCellCoords = this.pickDirection();
    }
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
      this.render();
      if (kill === null) {
        //debugger
        hunt = this.hunt(this.maze);
        this.render();
      }

      if (kill === null && hunt === null) {
        //debugger
        loop = false;
      }
    }
  }
}
