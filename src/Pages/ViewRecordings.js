import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";
import WaveForm from "../Components/WaveForm";
import WaveFormPrompt from "../Components/WaveFromPrompt";

export default function ViewRecordings() {
  const { user } = useSelector((state) => state.auth);
  const [audioURL, setAudioURL] = useState("");
  const [Option, setOption] = useState("horizontal");

  const onClick = (url) => {
    setAudioURL("data:audio/ogg;base64," + url);
  };

  return (
    <Dashboard>
      <div className="dashboard-activity">
        <div className="recording-list-box">
          {user.recordings.map((recording) => (
            <div
              key={recording._id}
              className="recording-list-element"
              onClick={() => onClick(recording.file)}
            >
              <span className="recording-list-icon"></span>
              <span className="recording-list-text">{recording.display}</span>
            </div>
          ))}
        </div>
      </div>

      {audioURL !== "" && (
        <div style={{ position: "relative", top: -145 }}>
          <div className="PracticeOptionLayout">
            <h6
              className="PracticeOption"
              onClick={() => {
                setOption("vertical");
              }}
            >
              Vertical View
            </h6>
            <h6
              className="PracticeOption"
              onClick={() => {
                setOption("horizontal");
              }}
            >
              Horizontal View
            </h6>
            <h6
              className="PracticeOption"
              onClick={() => {
                setOption("overlap");
              }}
            >
              Overlapped View
            </h6>
          </div>
          <div
            style={
              Option === "horizontal"
                ? { display: "flex", flexDirection: "row" }
                : {}
            }
          >
            <div
              style={
                Option === "overlap"
                  ? {
                      position: "absolute",
                      left: 0,
                    }
                  : {}
              }
            >
              <WaveFormPrompt
                url={audioURL}
                overlap={Option === "overlap" ? true : false}
                color={"green"}
                color1={"blue"}
              />
            </div>
            <div
              style={
                Option === "overlap"
                  ? {
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      width: "600px",
                      height: "200px",
                      border: "2px solid #14a44d",
                      position: "absolute",
                      left: 0,
                    }
                  : {
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      width: "600px",
                      height: "200px",
                      border: "2px solid #14a44d",
                    }
              }
            >
              <WaveForm
                url={audioURL}
                overlap={Option === "overlap" ? true : false}
                color={"red"}
                color1={"white"}
              />
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  );
}
