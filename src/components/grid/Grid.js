import "./grid.css";
import React, { useContext, useEffect, useState } from "react";
import { GridBox } from "../grid-box/GridBox";
import { CIRCLE, CROSS, DRAW } from "../../constants";
import { RootContext } from "../../Root";

export const Grid = () => {
  const [grid, setGrid] = useState([[], [], []]);
  const [moves, setMoves] = useState([]);

  const rootCtx = useContext(RootContext);

  useEffect(() => {
    const winner = didWin();
    const { increaseWins } = rootCtx;

    if (winner === CROSS || winner === CIRCLE || winner === DRAW) {
      increaseWins(winner);
    }
  }, [moves.length]);

  useEffect(() => {
    if (rootCtx.isReset) {
      setGrid([[], [], []]);
      setMoves([]);

      rootCtx.handleReset();
    }
  }, [rootCtx.isReset]);

  const clickHandler = (i, j) => {
    if (grid[i][j]) return;
    const { turn, setTurn } = rootCtx;
    const newGrid = [].concat(grid);
    const newMoves = [].concat(moves);

    newGrid[i][j] = turn;
    newMoves.push([i, j]);

    setGrid(newGrid);
    setMoves(newMoves);

    setTurn((p) => {
      return p === CIRCLE ? CROSS : CIRCLE;
    });
  };

  const didWin = () => {
    let rows = [0, 0, 0],
      cols = [0, 0, 0],
      dia = 0,
      antiDia = 0,
      count = 0;

    console.log(moves);
    let winner;
    for (let [row, column] of moves) {
      let value = count % 2 === 0 ? 1 : -1;
      rows[row] += value;
      cols[column] += value;

      if (row + column === 2) {
        antiDia += value;
      }

      if (row === column) {
        dia += value;
      }
      if ([rows[row], cols[column], antiDia, dia].includes(3)) {
        return CROSS;
      } else if ([rows[row], cols[column], antiDia, dia].includes(-3)) {
        return CIRCLE;
      }
      count++;
    }

    if (count < 9) {
      return "Pending";
    }

    return DRAW;
  };

  const items = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const e = (
        <div key={`${i}_${j}`} onClick={() => clickHandler(i, j)}>
          <GridBox type={grid[i]?.[j]} />
        </div>
      );

      items.push(e);
    }
  }

  return <div className="wrapper">{items}</div>;
};
