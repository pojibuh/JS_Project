class Cell {

  constructor(x, y, li) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.n = [this.x - 1, this.y];
    this.e = [this.x, this.y + 1];
    this.w = [this.x, this.y - 1];
    this.s = [this.x + 1, this.y];
    this.li = li;
  }

  visit() {
    this.visited = true;
    this.li.className = "visited";
  }

  addClass(className) {
    this.li.className += (" " + className);
  }

  visited() {
    return this.visited;
  }

}

export default Cell;
