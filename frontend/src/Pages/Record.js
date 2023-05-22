import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveFormCompareList from "../Components/WaveFormCompareList";
import WaveForm from "../Components/WaveForm";
import {
  getPublicLibrary,
  getPrivateLibrary,
  resetActivity,
} from "../features/library/librarySlice";
import {
  setWaveform,
  setWaveformPeak,
  resetWaveform,
} from "../features/waveform/waveformSlice";
import { getCategory } from "../features/category/categorySlice";
import { Check } from "react-bootstrap-icons";

export default function Record() {
  const { user } = useSelector((state) => state.auth);
  const { library, activity } = useSelector((state) => state.library);
  const { waveform } = useSelector((state) => state.waveform);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const onCompareClick = (recording) => {
    dispatch(resetActivity());
    dispatch(setWaveform(recording));
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      if (user === null) dispatch(getPublicLibrary(categories[0]._id));
      else dispatch(getPrivateLibrary(categories[0]._id));
    }
  }, [dispatch, user, categories]);

  const setWave1Peak = (peak) => {
    dispatch(setWaveformPeak([...peak]));
  };

  const changeCategory = (c) => {
    dispatch(resetWaveform());
    dispatch(resetActivity());
    if (user === null) dispatch(getPublicLibrary(c));
    else dispatch(getPrivateLibrary(c));
  };

  return (
    <div className="container">
      <div
        className="PracticeOptionLayout"
        style={{ position: "relative", left: "12vw" }}
      >
        {categories.map((c) => (
          <h4
            className="PracticeOption"
            key={c._id}
            onClick={() => changeCategory(c._id)}
          >
            {c.name}
          </h4>
        ))}
      </div>
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
          {Object.keys(waveform).length !== 0 && (
            <WaveForm
              url={"data:audio/ogg;base64," + waveform.file}
              color={"red"}
              color1={"white"}
              setWave={setWave1Peak}
            />
          )}
          {Object.keys(waveform).length !== 0 && <WaveFormCompareList />}
        </div>
        <div style={{ display: "flex" }}>
          {waveform.activity !== undefined && (
            <div>
              <h5>Previous Iteration</h5>
              <table style={{ marginLeft: 4 }}>
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
            </div>
          )}
          {activity.length !== 0 && (
            <div style={{ marginLeft: 30 }}>
              <h5>Current Iteration</h5>
              <table style={{ marginLeft: 6 }}>
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
                  {activity.map((act, i) => (
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
