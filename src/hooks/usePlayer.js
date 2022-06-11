import { useState, useCallback } from "react";
import { STAGE_HEIGHT, STAGE_WIDTH, checkCollision } from "../MovementChecker";
import { TETROMINOS, randomTetromino} from '../TetrisObjects';


export const usePlayer =()=>{
    const [player, setPlayer] = useState({
        pos: {x:0, y:0},
        tetromino: TETROMINOS[0].shape, 
        collided: false,
    })

    const rotate = (rotatiableTetris, dir) => {
        // Davamli olaraq setrleri sutuna ceviririk dondurmek ucun
        const rotatedTetro = rotatiableTetris.map((_, index) =>
        rotatiableTetris.map(col => col[index]),
        );
        // Her setri davamli olaraq donderirik
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
      };
    
      const playerRotation = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    
        const pos = clonedPlayer.pos.x;
        let checker = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
          clonedPlayer.pos.x += checker;
          checker = -(checker + (checker > 0 ? 1 : -1));
          if (checker > clonedPlayer.tetromino[0].length) {
            rotate(clonedPlayer.tetromino, -dir);
            clonedPlayer.pos.x = pos;
            return;
          }
        }
        setPlayer(clonedPlayer);
      };
    const UpdatePlayerPosition = ({x,y,collided}) =>{
        setPlayer(previous =>({
            ...previous,
            pos:{x: (previous.pos.x+=x), y:(previous.pos.y+=y)},
            collided,
        }))
    }
    const resetPlayer = useCallback(() =>{
        // resetPlayer objectleri baslangic halina getirecek, biz de bunu ekranin tam ortasina yerlesdirmeliyik
        setPlayer({
            pos:{x: STAGE_WIDTH / 2-2, y:0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])
        return[player, UpdatePlayerPosition, resetPlayer, playerRotation];
    }
