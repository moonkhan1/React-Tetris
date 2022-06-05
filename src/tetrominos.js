export const TETROMINOS = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
       shape: [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0]
              ],
       color: '128,172,170',       
  },
  J: {
    shape: [
             [0, 'J', 0],
             [0, 'J', 0],
             ['J', 'J', 0]
           ],
    color: '253,217,120',       
  },
  L: {
    shape: [
             [0, 'L', 0],
             [0, 'L', 0],
             [0, 'L', 'L']
           ],
    color: '96,85,66',       
  },
  O: {
    shape: [
             ['O', 'O'],
             ['O', 'O'],
           ],
    color: '110,47,59',       
  },
  S: {
    shape: [
             [0, 'S', 'S'],
             ['S', 'S', 0],
             [0, 0, 0]
           ],
    color: '211, 182, 156',       
  },
  T: {
    shape: [
             [0, 0, 0],
             ['T', 'T', 'T'],
             [0, 'T', 0]
           ],
    color: '175, 133, 97',       
  },
  Z: {
    shape: [
             ['Z', 'Z', 0],
             [0, 'Z', 'Z'],
             [0, 0, 0]
           ],
    color: '43, 33, 30',       
  },
}

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
}