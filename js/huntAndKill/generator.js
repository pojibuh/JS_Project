class Generator {

  constructor(grid) {
    this.grid = grid;
    this.currentCell = null;
  }

  pickDirection(currentSpot) {
    let guess = Math.floor(Math.random() * 4);
    switch(guess) {
      case 0:
        return currentCell.N;
      case 1:
        return currentCell.E;
      case 2:
        return currentCell.W;
      case 3:
        return currentCell.S;
    }
  }

  hunt (grid) {

  }

  kill (grid, x, y) {

  }
}
