function knightMoves(start) {
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

const moves = knightMoves([0, 0])
console.log(moves)