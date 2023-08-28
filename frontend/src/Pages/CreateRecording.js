import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadrecording } from "../features/auth/authSlice";
import Dashboard from "./Dashboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Oval } from "react-loader-spinner";


export default function CreateRecording() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [blob, setBlob] = useState(null);

  const [loader, setloader] = useState(false);
  const [loaderMessage, setloaderMessage] = useState("");
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Don't recognize speech api");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
    setloaderMessage("Please maintain silence while we start recording");
    setIsRecording(true);
    setloader(true);
    setTimeout(function () {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      setloader(false);
    }, 2000);
  };

  const stopRecording = () => {
    setloaderMessage("Please maintain silence while we finish recording");
    setloader(true);
    SpeechRecognition.stopListening();
    setTimeout(function () {
      setloader(false);
      setIsRecording(false);
    }, 2000);
  };

  const uploadRecording = async () => {
    const formData = new FormData();
    formData.append("recording", blob);
    formData.append("userid", user._id);
    formData.append("recordingName", transcript);
    setBlob("");
    // setRecordingName("");
    dispatch(uploadrecording(formData));
    window.location.reload();

  };

  return (
    <Dashboard>
      <div className="dashboard-activity">
        <audio src={audioURL} controls />
        <button
          className="btn btn-primary"
          onClick={startRecording}
          disabled={isRecording}
          style={{
            borderRadius: "0.375rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            margin: "1vw",
            backgroundColor: "#2596be",
          }}
        >
          start recording
        </button>
        <button
          className="btn btn-primary"
          onClick={stopRecording}
          disabled={!isRecording}
          style={{
            borderRadius: "0.375rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            margin: "1vw",
            backgroundColor: "#2596be",
          }}
        >
          stop recording
        </button>
        <div className="main-content">{transcript}</div>

        {loader && (
          <>
            <h6>{loaderMessage}</h6>
            <Oval
              height="25"
              width="25"
              radius="15"
              color="teal"
              strokeWidth={8}
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </>
        )}
        {/* <input
          id="recordingName"
          name="recordingName"
          type="text"
          value={recordingName}
          className="form-control "
          placeholder="Enter Recording Name"
          onChange={(e) => setRecordingName(e.target.value)}
          style={{ fontSize: "1vw", width: "30vw" }}
        /> */}

        <button
          className="btn btn-primary"
          disabled={!blob || !transcript}
          onClick={uploadRecording}
          style={{
            borderRadius: "0.375rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            margin: "2vw",
            backgroundColor: "#2596be",
          }}
        >
          upload recording
        </button>
      </div>
    </Dashboard>
  );
}
