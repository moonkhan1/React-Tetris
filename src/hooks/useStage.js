import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [ClearedRow, setClearedRow] = useState(0);

  useEffect(() => {
    setClearedRow(0);

    const vanishRows = newStage =>
      newStage.reduce((refreshedArr, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setClearedRow(prev => prev + 1);
          refreshedArr.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return refreshedArr;
        }
        refreshedArr.push(row);
        return refreshedArr;
      }, [])

    const updateStage = prevStage => {
      // First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      if(player.collided){
          resetPlayer();
          return vanishRows(newStage)
      }

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage,ClearedRow];
};