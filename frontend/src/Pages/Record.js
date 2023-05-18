import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveFormCompareList from "../Components/WaveFormCompareList";
import WaveForm from "../Components/WaveForm";
import {
  getPublicLibrary,
  getPrivateLibrary,
} from "../features/library/librarySlice";
import { setWaveform } from "../features/waveform/waveformSlice";
import { Check } from "react-bootstrap-icons";

export default function Record() {
  // const [library, setLibrary] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [wave1, setWave1] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { library } = useSelector((state) => state.library);
  const { waveform } = useSelector((state) => state.waveform);

  const dispatch = useDispatch();

  const onCompareClick = (recording, url) => {
    setAudioURL("data:audio/ogg;base64," + url);
    dispatch(setWaveform(recording));
  };

  useEffect(() => {
    if (user === null) dispatch(getPublicLibrary());
    else dispatch(getPrivateLibrary());
  }, [dispatch, user, waveform]);

  return (
    <div className="container">
      <div className="recording-list-box">
        {library.map((recording) => (
          <div
            key={recording._id}
            className="recording-list-element"
            onClick={() => onCompareClick(recording, recording.file)}
          >
            <span className="recording-list-icon"></span>
            <span className="recording-list-text">{recording.display}</span>
            {recording.activity !== undefined &&
              recording.activity.length !== 0 && (
                <Check color="white" size={30} />
              )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", position: "relative", left: "25vw" }}>
        <div>
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
        <div>
          {waveform.activity !== undefined && (
            <>
              <h4>Last Iteration:</h4>
              <table>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: 10 }}>
                      Peaks
                    </th>
                    <th style={{ border: "1px solid black", padding: 10 }}>
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {waveform.activity.percentage.map((act, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid black", padding: 10 }}>
                        {act.peaks}
                      </td>
                      <td style={{ border: "1px solid black", padding: 10 }}>
                        {act.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
