import "../css/game.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setWaveformPeak,
  setWaveformComparePeak,
  setWaveformCompareUrl,
  nextChallenge,
  lastChallenge,
  resetGame,
} from "../features/game/gameSlice";
import WaveForm from "./WaveForm";
import WaveFormPrompt from "./WaveFromPrompt";

export default function GameQuiz() {
  const { waveform, waveformCompareUrl, index, total, percentage, result } =
    useSelector((state) => state.game);

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
      <div className="game-bg"></div>
      <h4 className="remark">Good job!</h4>

      {result === "" ? (
        <div>
          <h2 className="gameHeading">Say {waveform.display}</h2>

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

          {percentage.peaks !== null && (
            <>
              <p>Phonetics:{percentage.peaks.toFixed(2).toString() + "%"}</p>
              <p>
                Completeness:{percentage.length.toFixed(2).toString() + "%"}
              </p>
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {index + 1 !== total ? (
              <button
                disabled={waveformCompareUrl === "" ? true : false}
                onClick={() => dispatch(nextChallenge())}
                className="btn btn-primary"
                style={{ backgroundColor: "rgb(24, 154, 180)" }}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => dispatch(lastChallenge())}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <h2 style={{ paddingRight: 350 }} className="gameHeading">
            {result}
          </h2>
          <button
            onClick={() => dispatch(resetGame())}
            className="btn btn-primary"
            style={{ backgroundColor: "rgb(24, 154, 180)" }}
          >
            End
          </button>
        </>
      )}
    </>
  );
}