class primGenerator {

  constructor(maze) {
    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
    this.frontier = this.getNeighbors(this.currentCell);
    this.run();
  }

  randomize(num) {
    return Math.floor(Math.random() * num)
  }

  shuffleFrontier() {
    let i = 0
    let j = 0
    let temp = null

    for (i = this.frontier.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = this.frontier[i]
      this.frontier[i] = this.frontier[j]
      this.frontier[j] = temp
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

  addToFrontier() {
    let currCellNeighbors = this.getNeighbors(this.currentCell);
    currCellNeighbors.forEach((neighbor) => {
      if (!this.frontier.includes(neighbor) && neighbor.visited === false) {
        this.frontier.push(neighbor);
      }
    })
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
    console.log("-------------");
  }

  run() {
      while(this.frontier.length > 0) {
        this.render();
        this.shuffleFrontier();
        this.currentCell = this.frontier.pop();
        this.currentCell.visit();
        this.addToFrontier();
      }
  }
}
