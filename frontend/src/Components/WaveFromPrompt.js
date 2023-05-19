import React, { useState, useEffect } from "react";
import { RecordCircle, StopFill } from "react-bootstrap-icons";
import WaveForm from "./WaveForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  updateActivity,
} from "../features/library/librarySlice";

export default function WaveFormPrompt({
  color,
  color1,
  overlap,
  setWave,
  percentage,
  length,
}) {
  const [url, setURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { waveform } = useSelector((state) => state.waveform);
  const { activity } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  useEffect(() => {
    setURL("");
    setWave([]);
  }, [waveform, setWave]);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      const url = URL.createObjectURL(e.data);
      setURL(url);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  useEffect(() => {
    if (user !== null && url !== "" && percentage !== null)
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

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <>
      {url === "" ? (
        <>
          <div
            style={{
              width: "600px",
              height: "128px",
              border: "2px solid #0275d8",
              marginBottom: -50,
            }}
          >
            <h6
              style={{
                padding: 50,
                color: "#0275d8",
              }}
            >
              Your WaveForm will be displayed here
            </h6>
          </div>
          <div style={{ position: "relative", top: -70, left: -105 }}>
            <button
              className="btn btn-sm btn-primary"
              onClick={startRecording}
              disabled={isRecording}
            >
              <RecordCircle size={25} />
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={stopRecording}
              disabled={!isRecording}
              style={{ marginLeft: -7 }}
            >
              <StopFill size={25} />
            </button>
          </div>
        </>
      ) : (
        <>
          <WaveForm
            url={url}
            color={color}
            color1={color1}
            overlap={overlap}
            setWave={setWave}
          />
        </>
      )}
    </>
  );
}
