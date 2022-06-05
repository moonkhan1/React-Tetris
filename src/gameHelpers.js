export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  )
  export const checkCollision = (player, stage, { x: Xhereketi, y: Yhereketi }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
      for (let x = 0; x < player.tetromino[y].length; x += 1) {
        // Eger 0 deyilse demeli biz tetris obyektleri olan xanadayiq
        if (player.tetromino[y][x] !== 0) {
          if (
            // Y oxu uzre oyunun daxilindeki xanalardayiq?
            !stage[y + player.pos.y + Yhereketi] ||
            // X oxu uzre oyunun daxilindeki xanalardayiq?
            !stage[y + player.pos.y + Yhereketi][x + player.pos.x + Xhereketi] ||
            // Gedeceyimiz xana clear olunmus xana deyil?
            stage[y + player.pos.y + Yhereketi][x + player.pos.x + Xhereketi][1] !==
              'clear'
          ) {
            return true;
          }
        }
      }
    }
  };