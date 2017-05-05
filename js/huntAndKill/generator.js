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
    for(let i = 0; i < maze.dimX; i++) {
      for(let j = 0; j < maze.dimY; j++) {
        let cell = this.grid[i][j];
        console.log(this.getNeighbors(cell))
        neighbors = this.getNeighbors(cell);
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
    console.log([this.currentCell.x, this.currentCell.y])
    console.log(nextCellCoords)
    while(this.maze.validPosition(nextCellCoords) === false || grid[nextCellCoords[0]][nextCellCoords[1]].visited === true) {
      nextCellCoords = this.pickDirection();
     console.log(nextCellCoords)
    }
    this.currentCell = grid[nextCellCoords[0]][nextCellCoords[1]];
    this.currentCell.visit();
    console.log("---------")
    let neighbors = this.getNeighbors(this.currentCell);
    console.log(neighbors)
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
  }

  run() {
    while(true) {
      let kill = this.kill(this.grid);
      let hunt;
      if (kill === null) {
        console.log("hunt begins")
        let hunt = this.hunt(this.maze)
        console.log(hunt)
      }
      else if (kill === null && hunt === null) {
        break;
      }
    }
  }
}
