class Cell {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.children = [];
    this.n = [this.x + 1, this.y];
    this.e = [this.x, this.y + 1];
    this.w = [this.x, this.y - 1];
    this.s = [this.x - 1, this.y];
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
