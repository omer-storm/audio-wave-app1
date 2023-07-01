import "../css/game.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setWaveformPeak,
  setWaveformComparePeak,
  setWaveformCompareUrl,
} from "../features/game/gameSlice";
import WaveForm from "./WaveForm";
import WaveFormPrompt from "./WaveFromPrompt";

export default function GameQuiz() {
  const { waveform, waveformCompareUrl, index } = useSelector(
    (state) => state.game
  );

  const setWavePeak = (peak) => {
    dispatch(setWaveformPeak([...peak]));
  };

  const setWaveComparePeak = (peak) => {
    dispatch(setWaveformComparePeak([...peak]));
  };

  const setWaveCompareUrl = (url) => {
    dispatch(setWaveformCompareUrl(url));
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
      <div style={{ marginTop: 8 }}>
        <WaveFormPrompt
          url={waveformCompareUrl}
          color={"red"}
          color1={"black"}
          setWave={setWaveComparePeak}
          setURL={setWaveCompareUrl}
        />
      </div>
    </>
  );
}
