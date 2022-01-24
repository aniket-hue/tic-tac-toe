import React, { createContext, useState } from "react";

import { Grid } from "./components/grid/Grid";
import { Stat } from "./components/stat/Stat";
import { Circle } from "./components/circle/Circle";
import { Cross } from "./components/cross/cross";
import { Modal } from "./components/modal/Modal";
import { CIRCLE, COLORS, CROSS, DRAW } from "./constants";
import "./Root.css";

export const RootContext = createContext();

export const Root = () => {
  const [turn, setTurn] = useState(CROSS);
  const [wins, setWins] = useState({ [CROSS]: 0, [CIRCLE]: 0, [DRAW]: 0 });
  const [isReset, setIsReset] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleReset = () => {
    setIsReset(!isReset);
    setTurn(CROSS);
  };

  const increaseWins = (winner) => {
    setWins((prevWins) => {
      return {
        ...prevWins,
        [winner]: prevWins[winner] + 1,
      };
    });

    setWinner(winner);
  };

  const okHandle = () => {
    setWinner(false);
    handleReset();
  };

  return (
    <>
      <RootContext.Provider
        value={{ turn, setTurn, isReset, handleReset, increaseWins }}
      >
        <div className="main">
          <div className="image-size">
            <Circle />
            <Cross />
          </div>

          <Grid />

          <div className="scores">
            <Stat color={COLORS.CROSS} title="P1" value={wins[CROSS]} />
            <Stat color={COLORS.DRAW} title="TIES" value={wins[DRAW]} />
            <Stat color={COLORS.CIRCLE} title="P2" value={wins[CIRCLE]} />
          </div>

          <div onClick={handleReset} className="reset-btn">
            <p>RESET</p>
          </div>
        </div>

        <Modal visible={winner} okHandle={okHandle}>
          <h1>
            {winner === CROSS
              ? "Player 1 wins!"
              : winner === DRAW
              ? "It's a tie!"
              : "Player 2 wins!"}
          </h1>
        </Modal>
      </RootContext.Provider>
    </>
  );
};
