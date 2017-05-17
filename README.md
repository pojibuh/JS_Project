# mazeCraft

Link to live site: [Live](http://moktarjama.com/mazeCraft)

mazeCraft is an application that showcases different maze algorithms in a user friendly and intuitive way.

![alt text](/images/mainpage.png)

## Features

Currently, mazeCraft has two algorithms available: Prim's Algorithm, and the Hunt-and-Kill Algorithm. Both are capable of making 'perfect' mazes, since they will always have one solution.

## Implementation

Initially, there is a maze that consists of unvisited cells. Each algorithm goes through the process of visiting the cells until all the cells are visited.

For example, the Hunt-and-Kill algorithm will initiate at a random cell, then go towards valid, unvisited cells until it is surrounded by visited cells.

```javascript
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



## Future Updates

Later additions will include more algorithms, as well as allowing for user input.
