import React, { useState, useEffect } from "react";
import WaveForm from "./WaveForm";

export default function WaveFormPrompt() {
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
    <div>
      {url === "" ? (
        <h6 style={{ margin: 40, color: "#f1f1f1" }}>
          Your WaveForm will be displayed here
        </h6>
      ) : (
        <WaveForm url={url} color={"white"} />
      )}
      <button
        className="btn btn-light"
        onClick={startRecording}
        disabled={isRecording}
      >
        start {url !== "" && "new"} recording
      </button>
      <button
        className="btn btn-light"
        onClick={stopRecording}
        disabled={!isRecording}
      >
        stop recording
      </button>
    </div>
  );
}
