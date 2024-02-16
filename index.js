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
  return [nne, ene, ese, sse, ssw, wsw, wnw, nnw]
}

const moves = knightMoves([3, 3])
console.log(moves)