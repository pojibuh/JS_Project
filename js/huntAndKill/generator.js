class Generator {

  constructor(grid) {
    this.grid = grid;
    this.currentCell = grid[this.randomize(grid.dimX)][this.randomize(grid.dimY)];
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
    let n = this.grid[cell.N[0]][cell.N[1]];
    let w = this.grid[cell.W[0]][cell.W[1]];
    let e = this.grid[cell.E[0]][cell.E[1]];
    let s = this.grid[cell.S[0]][cell.S[1]];

    [n, e, w, s].forEach((direction) => {
      if (this.grid.validPosition(direction)) {
        neighbors.push(direction);
      }
    })

    return neighbors;
  }

  hunt(grid) {
    for(let i = 0; i < grid.dimX; i++) {
      for(let j = 0; j < grid.dimY; j++) {
        let cell = grid[i][j];
        let neighbors = getNeighbors(cell);
        if (cell.visited === false && neighbors.length >= 1) {
          this.currentCell = cell;
          this.currentCell.visit();
          return -1;
        }
      }
    }

    return null;
  }

  kill(grid) {
    let nextCellCoords = this.pickDirection();
    while(!validPosition(nextCellCoords)) {
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

  run() {
    while(true) {
      let kill = kill(this.grid);
      let hunt;
      if (kill === null) {
        let hunt = hunt(this.grid)
      }
      else if (kill === null && hunt === null) {
        break;
      }
    }
  }
}
