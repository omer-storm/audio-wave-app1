import "../css/game.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setWaveformPeak,
  setWaveformComparePeak,
  setWaveformCompareUrl,
  nextChallenge,
  lastChallenge,
  resetGame,
  setSpeech,
  resetWaveform,
} from "../features/game/gameSlice";
import WaveForm from "./WaveForm";
import WaveFormPrompt from "./WaveFromPrompt";

export default function GameQuiz() {
  const {
    waveform,
    waveformCompareUrl,
    index,
    total,
    percentage,
    error,
    result,
  } = useSelector((state) => state.game);
  const [resetWave, setresetWave] = useState(false);

  const dispatch = useDispatch();

  const setWavePeak = (peak) => {
    dispatch(setWaveformPeak([...peak]));
  };

  const setWaveComparePeak = (peak) => {
    dispatch(setWaveformComparePeak(peak));
  };

  const setWaveCompareUrl = (url) => {
    dispatch(setWaveformCompareUrl(url));
  };

  const setThisSpeech = (speech) => {
    dispatch(setSpeech(speech));
  };

  return (
    <>
      <div className="game-bg"></div>
      <div className="game-bg1"></div>

      {result === "" ? (
        percentage !== null ? (
          <h5 className="remark">
            Your percentage is {percentage.toFixed(2).toString() + "%"}
          </h5>
        ) : (
          <h5 className="remark">
            {index == 0 ? "Hi! How are you?" : `Question no. ${index + 1}`}
          </h5>
        )
      ) : (
        <h5 className="remark">Thank you for your time!</h5>
      )}
      <div style={{ position: "relative", top: "7vw" }}>
        {result === "" ? (
          <div>
            <h2 className="gameHeading">Say {waveform.display}</h2>

            <WaveForm
              url={"data:audio/ogg;base64," + waveform.file}
              color={"red"}
              color1={"black"}
              setWave={setWavePeak}
            />
            {resetWave === false && (
              <div style={{ marginTop: 8 }}>
                <WaveFormPrompt
                  url={waveformCompareUrl}
                  color={"red"}
                  color1={"black"}
                  setWave={setWaveComparePeak}
                  setURL={setWaveCompareUrl}
                  setSpeech={setThisSpeech}
                />
              </div>
            )}

            {error !== "" && <p>{error}</p>}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "rgb(24, 154, 180)" }}
                disabled={waveformCompareUrl === "" ? true : false}
                onClick={() => {
                  setresetWave(true);
                  // setresetWave(false);

                  setTimeout(function () {
                    setresetWave(false);
                  }, 10);
                  dispatch(resetWaveform());
                }}
              >
                Reset
              </button>
              {index + 1 !== total ? (
                <button
                  disabled={
                    waveformCompareUrl === "" || percentage === null
                      ? true
                      : false
                  }
                  onClick={() => {
                    setresetWave(true);
                    // setresetWave(false);

                    setTimeout(function () {
                      setresetWave(false);
                    }, 10);
                    dispatch(nextChallenge());
                  }}
                  className="btn btn-primary"
                  style={{ backgroundColor: "rgb(24, 154, 180)" }}
                >
                  Next
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={
                    waveformCompareUrl === "" || percentage === null
                      ? true
                      : false
                  }
                  onClick={() => {
                    setresetWave(true);
                    // setresetWave(false);

                    setTimeout(function () {
                      setresetWave(false);
                    }, 10);

                    dispatch(lastChallenge());
                  }}
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
      </div>
    </>
  );
}
