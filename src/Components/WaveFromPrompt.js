import React, { useState, useEffect } from "react";
import WaveForm from "./WaveForm";

export default function WaveFormPrompt({ color, color1, overlap }) {
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
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        width: "600px",
        height: "250px",
        border: "2px solid #14a44d",
      }}
    >
      {url === "" ? (
        <h6
          style={{
            position: "relative",
            top: 40,
            margin: 60,
            marginLeft: 30,
            color: "green",
          }}
        >
          Your WaveForm will be displayed here
        </h6>
      ) : (
        <WaveForm url={url} color={color} color1={color1} overlap={overlap} />
      )}
      {!overlap && (
        <div>
          <button
            className="btn btn-sm btn-success"
            onClick={startRecording}
            disabled={isRecording}
          >
            start {url !== "" && "new"} recording
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            stop recording
          </button>
        </div>
      )}
    </div>
  );
}
