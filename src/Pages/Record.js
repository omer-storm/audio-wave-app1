import React, { useEffect, useState } from "react";
import WaveFormPrompt from "../Components/WaveFromPrompt";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPercentage } from "../features/comparision/comparisionSlice";
import WaveFormCompare from "../Components/WaveFormCompare";

export default function Record() {
  const [library, setLibrary] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [Option, setOption] = useState("");

  const dispatch = useDispatch();
  const { pecentage } = useSelector((state) => state.comparision);

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
      <button
        onClick={() => {
          dispatch(getPercentage());
        }}
        className="btn btn-primary"
      >
        Get Percentage
      </button>
      <div>
        <h1>{pecentage} %</h1>

        
        <div
          style={
            Option === "horizontal"
              ? { display: "flex", flexDirection: "row" }
              : {}
          }
        >
          {/* <div
            style={
              Option === "overlap"
                ? { position: "absolute", left: 100, top: 300 }
                : {}
            }
          >
            <WaveFormPrompt
              overlap={Option === "overlap" ? true : false}
              color="red"
              color1={"white"}
              name="wave1"
            />
          </div>
          <div
            style={
              Option === "overlap"
                ? { position: "absolute", left: 100, top: 300 }
                : {}
            }
          >
            <WaveFormPrompt
              overlap={Option === "overlap" ? true : false}
              color="green"
              color1={"blue"}
              name="wave2"
            />
          </div> */}
          { audioURL !== "" &&  <WaveFormCompare audioURL={audioURL} />}
        </div>
      </div>
    </div>
  );
}
