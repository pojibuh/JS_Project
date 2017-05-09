import Maze from './maze'

class primGenerator {

  constructor(maze) {
    this.maze = maze;
    this.grid = maze.grid;
    this.currentCell = this.grid[this.randomize(maze.dimX)][this.randomize(maze.dimY)];
    this.currentCell.visit();
    this.frontier = this.getNeighbors(this.currentCell);
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

  connectNeighbor(cell) {
    //pick neighbor to connect with after hunting cell down
    let chosenNeighbor;
    let visitedNeighbors = this.getNeighbors(cell).filter((neighbor) => {
      return neighbor.visited === true;
    });
    if (visitedNeighbors.length === 1) {
      chosenNeighbor = visitedNeighbors[0];
    } else if (visitedNeighbors.length > 1) {
      chosenNeighbor = visitedNeighbors[this.randomize(visitedNeighbors.length)]
    }
    // debugger
    this.removeBorder(cell, chosenNeighbor);
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

  addToFrontier() {
    let currCellNeighbors = this.getNeighbors(this.currentCell);
    currCellNeighbors.forEach((neighbor) => {
      if (!this.frontier.includes(neighbor) && neighbor.visited === false) {
        this.frontier.push(neighbor);
      }
    })
  }

  run() {
      if (this.frontier.length === 0) { return; }
      this.shuffleFrontier();
      this.currentCell = this.frontier.pop();
      this.currentCell.visit();
      this.connectNeighbor(this.currentCell)
      this.addToFrontier();
      setTimeout(() => {
        this.run();
      }, 5)
  }
}

export default primGenerator;
