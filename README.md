# mazeCraft

Link to live site: [Live](http://moktarjama.com/mazeCraft)

mazeCraft is an application that showcases different maze algorithms in a user friendly and intuitive way.

![alt text](/images/mainpage.png)

## Features

Currently, mazeCraft has two algorithms available: Prim's Algorithm, and the Hunt-and-Kill Algorithm. Both are capable of making 'perfect' mazes, since they will always have one solution.

## Implementation

Initially, there is a maze that consists of unvisited cells. Each algorithm goes through the process of visiting the cells until all the cells are visited.

For example, the Hunt-and-Kill algorithm will initiate at a random cell, then go towards valid, unvisited cells until it is surrounded by visited cells.

```JavaScript
pickDirection() {
  let currCellNeighbors = this.getNeighbors(this.currentCell);
  let unvisitedNeighbors = currCellNeighbors.filter((neighbor) => {
    return neighbor.visited === false;
  });

  if (unvisitedNeighbors.length >= 1) {
    let chosenNeighbor = unvisitedNeighbors[this.randomize(unvisitedNeighbors.length)];
    return [chosenNeighbor.x, chosenNeighbor.y];
  } else {
    return null;
  }
}
```

Both algorithms have the ability to assess whether any of their neighbors are 'valid' (unvisited and within the bounds of the grid), as well as connect themselves to the chosen neighbor. For the Hunt-and-Kill algorithm, the getNeighbors function allows it to maintain its random nature by only letting the algorithm move towards valid cells. Each cell is aware of its neighbors, so the check is merely involves iterating through each of them.

For both Prim's and the Hunt-and-Kill algorithm's hunt phase, the algorithm has to connect to a neighbor after it visits a new cell. Which neighbor to connect to is a simple choice if only one neighbor has been visited, but trickier when there is more than one. The connectNeighbor function will either connect the current cell to its only viable neighbor, or choose a neighbor at random if there are multiple possibilities.

```JavaScript
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

connectNeighbor(cell, neighbors) {
  let chosenNeighbor;
  let visitedNeighbors = neighbors.filter((neighbor) => {
    return neighbor.visited === true;
  });
  if (visitedNeighbors.length === 1) {
    chosenNeighbor = visitedNeighbors[0];
  } else if (visitedNeighbors.length > 1) {
    chosenNeighbor = visitedNeighbors[this.randomize(visitedNeighbors.length)]
  }

  this.removeBorder(cell, chosenNeighbor);
}
```

## Future Updates

Later additions will include more algorithms, as well as allowing for user input.
