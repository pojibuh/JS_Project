class Cell {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.children = [];
    this.N = [this.x + 1, this.y];
    this.E = [this.x, this.y + 1];
    this.W = [this.x, this.y - 1];
    this.S = [this.x - 1, this.y];
  }

  visit() {
    this.visited = true;
  }

  visited() {
    return this.visited;
  }

  addChild(node) {
    this.children.push(node)
  }
}

module.exports = Cell;
