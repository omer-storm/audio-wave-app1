import "../css/game.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../features/category/categorySlice";
import { getPublicLibrary } from "../features/game/gameSlice";

export default function GameOption() {
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <h2 className="gameHeading">Select Difficulty: </h2>
      {categories.map((c) => (
        <button
          key={c._id}
          onClick={() => dispatch(getPublicLibrary(c._id))}
          className="gameOption"
          style={{
            borderRadius: "0.375rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            margin: "1vw",
          }}
        >
          {c.difficulty}
        </button>
      ))}
    </>
  );
}
