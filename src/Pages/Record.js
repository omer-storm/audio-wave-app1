import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import WaveForm from "../Components/WaveForm";

export default function Record() {
  const [audioURL, setAudioURL] = useState([]);
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
      audioURL.push(url);
      setAudioURL(audioURL);
      setURL(url);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording, audioURL]);

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
    <div className="record-screen-bg">
      <Navbar />
      <div className="record-screen">
        {audioURL.map((url, index) => (
          <WaveForm key={index} url={url} color={"green"} />
        ))}
        {url === "" && (
          <h6 style={{ margin: 40 }}>Your WaveForm will be displayed here</h6>
        )}
        <button
          className="btn btn-success"
          onClick={startRecording}
          disabled={isRecording}
        >
          start recording
        </button>
        <button
          className="btn btn-success"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          stop recording
        </button>
      </div>
    </div>
  );
}
