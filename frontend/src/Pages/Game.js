import "../css/game.css";
import React from "react";
import { useSelector } from "react-redux";

function Game() {
  const { categories } = useSelector((state) => state.category);

  return (
    <div className="gameOptionPosition">
      <h2 className="gameOptionHeading">Select Difficulty: </h2>
      {categories.map((c) => (
          <button className="gameOption">{c.difficulty}</button>
      ))}
    </div>
  );
}

export default Game;
