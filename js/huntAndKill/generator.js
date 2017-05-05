class Generator {

  constructor(maze) {
    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
    this.run();
  }

  pickDirection() {
    let guess = this.randomize(4);
    switch(guess) {
      case 0:
        return this.currentCell.n;
      case 1:
        return this.currentCell.e;
      case 2:
        return this.currentCell.w;
      case 3:
        return this.currentCell.s;
    }
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
      while(!foundNewCell && j < maze.dimY) {
        let cell = this.grid[i][j];
        console.log(cell)
        neighbors = this.getNeighbors(cell);
        console.log(this.hasVisitedNeighbor(neighbors))
        if (cell.visited === false && this.hasVisitedNeighbor(neighbors)) {
          console.log("found new cell")
          this.currentCell = cell;
          this.currentCell.visit();
          foundNewCell = true;
        } else if (cell.visited === true) {
          visited.push(cell);
        }
        j++;
      }
      i++;
    }

    if (visited.length === (maze.dimX * maze.dimY)) {
      console.log("found nothing")
      return null;
    } else {
      console.log(visited)
      console.log("found something")
      console.log(this.currentCell)
      return -1;
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
    console.log([this.currentCell.x, this.currentCell.y])
    console.log(nextCellCoords)
    while(this.maze.validPosition(nextCellCoords) === false || grid[nextCellCoords[0]][nextCellCoords[1]].visited === true) {
      nextCellCoords = this.pickDirection();
    }
    this.currentCell = grid[nextCellCoords[0]][nextCellCoords[1]];
    this.currentCell.visit();
    console.log("---------")
    console.log(this.currentCell);
    let neighbors = this.getNeighbors(this.currentCell);
    let unvisited = [];
    neighbors.forEach((neighbor) => {
      if(neighbor.visited === false) {
        unvisited.push(neighbor);
      }
    })
    if(unvisited.length === 0) {
      console.log('kill phase actually over')
      return null;
    } else {
      return -1;
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
    return currentGrid;
  }

  run() {
    while(true) {
      let kill = this.kill(this.grid);
      let hunt;
      if (kill === null) {
        console.log("hunt begins")
        hunt = this.hunt(this.maze)
        console.log(hunt)
      }

      if (kill === null && hunt === null) {
        break;
      }
      this.render();
    }
  }
}
