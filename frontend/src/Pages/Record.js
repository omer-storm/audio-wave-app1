import React, { useEffect, useState } from "react";
import axios from "axios";
import WaveFormCompareList from "../Components/WaveFormCompareList";
import WaveForm from "../Components/WaveForm";

export default function Record() {
  const [library, setLibrary] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [wave1, setWave1] = useState([]);

  const getLibrary = async () => {
    const response = await axios.get("http://localhost:5000/api/library/");
    setLibrary(response.data);
  };

  const onCompareClick = (url) => {
    setAudioURL("data:audio/ogg;base64," + url);
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
              onClick={() => onCompareClick(recording.file)}
            >
              <span className="recording-list-icon"></span>
              <span className="recording-list-text">{recording.display}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ position: "relative", left: "25vw", top: 10 }}>
        {audioURL !== "" && (
          <WaveForm
            url={audioURL}
            color={"red"}
            color1={"white"}
            setWave={setWave1}
          />
        )}
        {audioURL !== "" && <WaveFormCompareList audioURL={audioURL} wave1={wave1} />}
      </div>
    </div>
  );
}
