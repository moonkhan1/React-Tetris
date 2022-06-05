import React from 'react';
import { useState } from 'react';
import { createStage } from '../gameHelpers';

//styles
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/gameStatics';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { checkCollision } from '../gameHelpers';

const Tetris = () => {

  const [dropSpeed, setDropSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);


  const [player, UpdatePlayerPosition, resetPlayer, playerRotation] = usePlayer();
  const [stage, setStage, ClearedRow] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(ClearedRow)

  console.log('re-render');

  const moveTetrisObject = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      UpdatePlayerPosition({ x: dir, y: 0 })
    }
  }
  // reset
  const startGame = () => {
    console.log('test')
    setStage(createStage());
    setDropSpeed(1000);
    resetPlayer();
    setGameOver(false);
    setLevel(0);
    setRows(0);
    setScore(0);
  }
  const drop = () => {
    // Eger oyuncu 10 stri silerse novbeti levele kecsin
    if(ClearedRow > (level+1)*10){
      setLevel (prev => prev+1);
      //Suret artsin
      setDropSpeed(1000 / (level+1)+350)
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      UpdatePlayerPosition({ x: 0, y: 1, collided: false });
    }
    else {
      if (player.pos.y < 1) {
        console.log("Game Over!");
        setGameOver(true);
        setDropSpeed(null)
      }
      UpdatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  }
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on")
        setDropSpeed(1000 / (level+1)+350);
      }
    }
  };

  const dropTetrisObject = () => {
    // down duymesi basilanda interval dayansin
    console.log("interval off")
    setDropSpeed(null);
    drop();
  }
  //move tetris object when pressed keys
  const move = ({ keyCode }) => {
    if (!gameOver) {
      // left
      if (keyCode === 37) {
        moveTetrisObject(-1);
      }
      // right
      else if (keyCode === 39) {
        moveTetrisObject(1);
      }
      //down
      else if (keyCode === 40) {
        dropTetrisObject();
      }
      else if (keyCode === 38) {
        playerRotation(stage, 1) // 1 = saat eqrebi istiqametinde donus
      }
    }
  }
  useInterval(() => {
    drop()
  }, dropSpeed)

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={ele => move(ele)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
