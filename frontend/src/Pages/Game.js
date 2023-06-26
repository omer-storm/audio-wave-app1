import "../css/game.css";
import React from "react";

function Game() {
  return (
    <div className="gameOptionPosition">
      <h2 className="gameOptionHeading">Select Difficulty: </h2>
      <button className="gameOption">Easy</button>
      <button className="gameOption">Medium</button>
      <button className="gameOption">Hard</button>
    </div>
  );
}

export default Game;
