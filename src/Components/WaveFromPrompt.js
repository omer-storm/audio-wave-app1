import React, { useState, useEffect } from "react";
import { RecordCircle, StopFill } from "react-bootstrap-icons";
import WaveForm from "./WaveForm";

export default function WaveFormPrompt({ color, color1, overlap, name }) {
  const [url, setURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

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
    <div style={{ display: "flex" }}>
      {!overlap && (
        <div style={{padding: "10px"}}>
          <button
            className="btn btn-primary"
            onClick={startRecording}
            disabled={isRecording}
            style={{marginRight: "-5px"}}
          >
            <RecordCircle size={30} />
          </button>
          {/* <br /> */}
          <button
            className="btn btn-primary"
            onClick={stopRecording}
            disabled={!isRecording}
            style={{marginRight: "-5px"}}
          >
            <StopFill size={30} />
          </button>
        </div>
      )}
      <div
        style={{
          // backgroundColor: "rgba(0, 0, 0, 0.9)",
          width: "600px",
          height: "170px",
          border: "2px solid #0275d8",
          // marginBottom: 50
        }}
      >
        {url === "" ? (
          <h6
            style={{
              padding: 50,
              color: "#0275d8",
            }}
          >
            Your WaveForm will be displayed here
          </h6>
        ) : (
          <WaveForm
            url={url}
            color={color}
            color1={color1}
            overlap={overlap}
            name={name}
          />
        )}
      </div>
    </div>
  );
}
