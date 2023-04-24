import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import WaveFormCompareList from "../Components/WaveFormCompareList";
import WaveForm from "../Components/WaveForm";
import { setWaveform } from "../features/waveform/waveformSlice";
import { Check } from "react-bootstrap-icons";

export default function Record() {
  const [library, setLibrary] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [wave1, setWave1] = useState([]);

  const dispatch = useDispatch();

  const getLibrary = async () => {
    const response = await axios.get("http://localhost:5000/api/library/");
    setLibrary(response.data);
  };

  const onCompareClick = (recording, url) => {
    setAudioURL("data:audio/ogg;base64," + url);
    dispatch(setWaveform(recording));
  };

  useEffect(() => {
    getLibrary();
  }, []);

  return (
    <div className="container">
      {library.map && (
        <div className="recording-list-box">
          {library.map((recording) => (
            <div
              key={recording._id}
              className="recording-list-element"
              onClick={() => onCompareClick(recording, recording.file)}
            >
              <span className="recording-list-icon"></span>
              <span className="recording-list-text">{recording.display}</span>
              <Check color="white" size={30} />
            </div>
          ))}
        </div>
      )}
      <div style={{ position: "relative", left: "25vw" }}>
        {audioURL !== "" && (
          <WaveForm
            url={audioURL}
            color={"red"}
            color1={"white"}
            setWave={setWave1}
          />
        )}
        {audioURL !== "" && (
          <WaveFormCompareList audioURL={audioURL} wave1={wave1} />
        )}
      </div>
    </div>
  );
}
