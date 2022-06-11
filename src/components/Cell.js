import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../TetrisObjects';

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
)

export default React.memo(Cell);