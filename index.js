function moveFinder(start) {
  // generate all possible knight moves
  // read variable names as semi-cardinal compass directions
  // eg, nne means North of North East
  const [x, y] = start
  const nne = [x + 1, y + 2]
  const ene = [x + 2, y + 1]
  const ese = [x + 2, y - 1]
  const sse = [x + 1, y - 2]
  const ssw = [x - 1, y - 2]
  const wsw = [x - 2, y - 1]
  const wnw = [x - 2, y + 1]
  const nnw = [x - 1, y + 2]

  // get coordinates that fit within bounds of board
  const valid = [nne, ene, ese, sse, ssw, wsw, wnw, nnw]

  for (let i = 0; i < valid.length; i++) {
    const pos = valid[i]

    const lowX = pos[0] < 0
    const lowY = pos[1] < 0

    const highX = pos[0] > 7
    const highY = pos[1] > 7

    const outside = lowX || lowY || highX || highY
    
    if(outside) {
      valid.splice(i, 1)
      i-- // deleting an element shifts indexes
    }
  }

  return valid
}

function pathFinder(graph, end, currentPath = []) {
  // DFS to return an array of sets of fastest paths
  const lastVertex = currentPath[currentPath.length - 1]

  if (lastVertex.toString() === end.toString()) {
    currentPath = new Set(currentPath)
    return [currentPath]
  }

  const paths = []

  if(graph[lastVertex]) {
    for (const adjacent of graph[lastVertex]) {
      if (!currentPath.some(vertex => vertex.toString() === adjacent.toString())) {
        const newPath = currentPath.concat([adjacent])
        const subPaths = pathFinder(graph, end, newPath)
        paths.push(...subPaths)
      }
    }
  }

  return paths
}

function knightMoves(start, end) {
  // BFS to generate directed graph
  const graph = {}
  const queue = [start]

  while(queue.length > 0) {
    const vertex = queue.shift()

    // prevent duplicate
    if(graph[vertex]) continue

    // stringification prevents comparison by memory reference 
    if(vertex.toString() == end.toString()) break

    // add vertex to graph
    graph[vertex] = []

    for (const move of moveFinder(vertex)) {
      graph[vertex].push(move)
      queue.push(move)     
    }
  }

  return pathFinder(graph, end, [start])
}

const moves = knightMoves([0, 0], [3, 3])
console.log(moves) // console outputs:
// [
//   Set(3) { [ 0, 0 ], [ 1, 2 ], [ 3, 3 ] },
//   Set(3) { [ 0, 0 ], [ 2, 1 ], [ 3, 3 ] }
// ]
