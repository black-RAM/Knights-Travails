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

  return graph
}

const moves = knightMoves([0, 0], [2, 1])
console.log(moves)