
import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = ClearedRow => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    // Xal
    if (ClearedRow > 0) {
      setScore(prev => prev + linePoints[ClearedRow - 1] * (level + 1));
      setRows(prev => prev + ClearedRow);
    }
  }, [level, linePoints, ClearedRow]);

  useEffect(() => {
    calcScore();
  }, [calcScore, ClearedRow, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};