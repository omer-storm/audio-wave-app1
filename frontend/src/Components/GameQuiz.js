import "../css/game.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWaveformPeak } from "../features/game/gameSlice";
import WaveForm from "./WaveForm";

export default function GameQuiz() {
  const { waveform, index } = useSelector((state) => state.game);

  const setWavePeak = (peak) => {
    dispatch(setWaveformPeak([...peak]));
  };

  const dispatch = useDispatch();

  return (
    <>
      <h2 className="gameHeading">Challenge no.{index + 1}</h2>

      <WaveForm
        url={"data:audio/ogg;base64," + waveform.file}
        color={"red"}
        color1={"black"}
        setWave={setWavePeak}
      />
    </>
  );
}
