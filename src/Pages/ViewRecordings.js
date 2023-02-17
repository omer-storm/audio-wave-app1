import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";
import WaveForm from "../Components/WaveForm";
import WaveFormPrompt from "../Components/WaveFromPrompt";

export default function ViewRecordings() {
  const { user } = useSelector((state) => state.auth);
  const [audioURL, setAudioURL] = useState("");

  const onClick = (url) => {
    setAudioURL("/uploads/" + url);
  };

  return (
    <Dashboard>
      <div className="dashboard-activity">
        <div className="recording-list-box">
          {user.recordings.map((recording) => (
            <div
              key={recording._id}
              className="recording-list-element"
              onClick={() => onClick(recording.filename)}
            >
              <span className="recording-list-icon"></span>
              <span className="recording-list-text">{recording.display}</span>
            </div>
          ))}
        </div>

        {audioURL !== "" && <WaveForm url={audioURL} />}

        {audioURL !== "" && <WaveFormPrompt />}
      </div>
    </Dashboard>
  );
}
