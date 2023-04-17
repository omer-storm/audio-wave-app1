import React, { useEffect, useState } from "react";
import axios from "axios";

function Adminpanel() {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [blob, setBlob] = useState(null);
  const [recordingName, setRecordingName] = useState("");

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
    const handleData = async (e) => {
      const chunk = [];
      chunk.push(e.data);
      const blob = new Blob(chunk, { type: "audio/ogg; codecs=opus" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setBlob(blob);
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

  const uploadRecording = async () => {
    console.log(recordingName);
    console.log(blob);
    const formData = new FormData();
    formData.append("recording", blob);
    formData.append("recordingName", recordingName);
    await axios.post("http://localhost:5000/api/library/", formData);
    setBlob("");
    setRecordingName("");
  };

  return (
    <div className="container">
      <audio src={audioURL} controls />
      <button
        className="btn btn-primary"
        onClick={startRecording}
        disabled={isRecording}
      >
        start recording
      </button>
      <button
        className="btn btn-primary"
        onClick={stopRecording}
        disabled={!isRecording}
      >
        stop recording
      </button>
      <input
        id="recordingName"
        name="recordingName"
        type="text"
        value={recordingName}
        className="form-control "
        placeholder="Enter Recording Name"
        onChange={(e) => setRecordingName(e.target.value)}
      />
      <button
        className="btn btn-primary"
        disabled={!blob || !recordingName}
        onClick={uploadRecording}
      >
        upload recording
      </button>
    </div>
  );
}

export default Adminpanel;
