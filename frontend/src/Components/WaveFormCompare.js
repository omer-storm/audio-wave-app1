import React, { useEffect, useState } from "react";
import WaveFormPrompt from "./WaveFromPrompt";
import { useDispatch, useSelector } from "react-redux";
import WaveFormOverlap from "./WaveFormOverlap";
import {
  createActivity,
  updateActivity,
} from "../features/library/librarySlice";

function WaveFormCompare() {
  const [wave2, setWave2] = useState([]);
  const [url, setURL] = useState("");
  const [overlap, setOverlap] = useState(false);
  const [speech, setSpeech] = useState("");
  const [length, setlength] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { waveform, waveformPeak } = useSelector((state) => state.waveform);
  const { activity } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  useEffect(() => {
    setURL("");
    setWave2([]);
  }, [waveform, setURL, setWave2]);

  useEffect(() => {
    setlength(getLength());
  }, [speech, wave2]);

  const percentage = (function getPercentage() {
    const percentage = [];
    let sum = 0;
    let calc = null;
    waveformPeak.forEach((x, i) => {
      calc = (wave2[i] / x) * 100;
      if (!isNaN(calc)) percentage.push(calc);
    });
    percentage.forEach((x) => {
      sum = sum + x;
    });
    let average = sum / percentage.length;

    return isNaN(average) ? null : average.toFixed(2).toString() + "%";
  })();

  function getLength() {
    if (speech === waveform.display || speech === "") {
      let length;
      if (speech === "") {
        wave2.length > waveformPeak.length
          ? (length = (waveformPeak.length / wave2.length) * 50)
          : (length = (wave2.length / waveformPeak.length) * 50);
      } else {
        wave2.length > waveformPeak.length
          ? (length = (waveformPeak.length / wave2.length) * 100)
          : (length = (wave2.length / waveformPeak.length) * 100);
      }

      return length.toFixed(2).toString() + "%";
    } else {
      return "";
    }
  }

  function viewAnyway() {
    if (speech.split(" ").length === 1) {
      let length;

      wave2.length > waveformPeak.length
        ? (length = (waveformPeak.length / wave2.length) * 50)
        : (length = (wave2.length / waveformPeak.length) * 50);
      setlength(length.toFixed(2).toString() + "%");
    } else {
      setlength("error");
    }
  }

  useEffect(() => {
    if (user !== null && url !== "" && percentage !== null && length !== "" && length !== "error")
      if (activity.length === 0) {
        dispatch(
          createActivity({
            user: user._id,
            record: waveform._id,
            percentage: [{ peaks: percentage, length: length }],
          })
        );
      } else {
        dispatch(
          updateActivity({
            user: user._id,
            record: waveform._id,
            percentage: [...activity, { peaks: percentage, length: length }],
          })
        );
      }
  }, [url, dispatch, length, percentage, user]);

  return (
    <>
      {overlap === false && (
        <WaveFormPrompt
          color="purple"
          color1={"teal"}
          setWave={setWave2}
          setSpeech={setSpeech}
          setURL={setURL}
          url={url}
        />
      )}
      {percentage !== null && (
        <>
          {overlap === true && url !== "" && <WaveFormOverlap url={url} />}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h6 style={{ color: "#189AB4" }}>
                {speech !== ""
                  ? "Recognized: " + speech
                  : "Cannot recognize word"}
              </h6>
              {length !== "" && length !== "error" ? (
                <h6 style={{ color: "#189AB4" }}>Percentage is {length}</h6>
              ) : (
                length !== "error" ? <div>
                  <h6 style={{ color: "#189AB4" }}>
                    Incorrect word recognized
                  </h6>
                  <button
                    onClick={viewAnyway}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#189AB4",
                      color: "white",
                      zIndex: 11,
                    }}
                  >
                    View Anyway
                  </button>
                </div> : <h6 style={{ color: "#189AB4" }}>
                  Error Occured
                </h6>

              )}
            </div>
            <button
              className="btn btn-sm"
              onClick={() => {
                setOverlap(!overlap);
              }}
              style={{
                backgroundColor: "#189AB4",
                color: "white",
                zIndex: 11,
                height: 40,
              }}
            >
              Overlap
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default WaveFormCompare;
