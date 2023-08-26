import React, { useState, useEffect } from "react";
import { RecordCircle, StopFill } from "react-bootstrap-icons";
import WaveForm from "./WaveForm";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Oval } from "react-loader-spinner";

export default function WaveFormPrompt({
  color,
  color1,
  setSpeech,
  setWave,
  url,
  setURL,
}) {
  const [speechtext, setSpeechText] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [loader, setloader] = useState(false);
  const [loaderMessage, setloaderMessage] = useState("");
  const [recorder, setRecorder] = useState(null);

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Don't recognize speech api");
  }

  useEffect(() => {
    if (isRecording) {
      setSpeechText(transcript);
    } else {
      setSpeechText("");
    }
  }, [transcript]);

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
      console.log("going again");
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
      setSpeech(transcript);
    }, 2000);
  };

  return (
    <>
      {url === "" ? (
        <>
          <div
            style={{
              width: "600px",
              height: "128px",
              border: "2px solid #189AB4",
              borderRadius: 8,

              marginBottom: -50,
            }}
          >
            <h6
              style={{
                padding: 50,
                color: "#189AB4",
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
              style={{ backgroundColor: "#189AB4" }}
            >
              <RecordCircle size={25} />
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={stopRecording}
              disabled={!isRecording}
              style={{ marginLeft: -7, backgroundColor: "#189AB4" }}
            >
              <StopFill size={25} />
            </button>
          </div>
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

          <div className="main-content">{transcript}</div>
        </>
      ) : (
        <>
          <WaveForm url={url} color={color} color1={color1} setWave={setWave} />
        </>
      )}
    </>
  );
}
