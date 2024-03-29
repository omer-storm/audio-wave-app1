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
import { getCategory, setSelectedCategory } from "../features/category/categorySlice";
import { Check } from "react-bootstrap-icons";

export default function Record() {
  const { user } = useSelector((state) => state.auth);
  const { library, activity } = useSelector((state) => state.library);
  const { waveform, waveformActivity } = useSelector((state) => state.waveform);
  const { categories, selectedCategory } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const onCompareClick = (recording) => {
    if (waveform.activity !== undefined) {
      dispatch(resetActivity());
      dispatch(resetWaveform());
      if (user === null) dispatch(getPublicLibrary(selectedCategory));
      else dispatch(getPrivateLibrary(selectedCategory));
    }

    dispatch(setWaveform(recording));
  };

  useEffect(() => {
    dispatch(resetWaveform());
    dispatch(resetActivity());
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      dispatch(setSelectedCategory(categories[0]._id));
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

    dispatch(setSelectedCategory(c));

    if (user === null) dispatch(getPublicLibrary(c));
    else dispatch(getPrivateLibrary(c));
  };

  return (
    <div className="container">
      <div
        className="PracticeOptionLayout"
        style={{ position: "relative", left: "12vw", top: "2vw" }}
      >
        {categories.map((c) => (
          <h4
            className="PracticeOption"
            key={c._id}
            onClick={() => changeCategory(c._id)}
            style={{
              margin: "10px",
              borderRadius: "0.375rem",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#9570b8",
              width: "11vw",
              textAlign: "center",
              marginTop: "3vw",
              marginBottom: "3vw",
            }}
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
            style={{
              borderRadius: "0.375rem",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#9570b8",
            }}
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

      <div style={{ display: "flex", position: "relative", left: "18.5vw" }}>
        <div>
          {Object.keys(waveform).length !== 0 && (
            <div style={user === null ? { marginLeft: "13vw" } : {}}>
              <WaveForm
                url={"data:audio/ogg;base64," + waveform.file}
                color={"purple"}
                color1={"teal"}
                setWave={setWave1Peak}
              />
              <WaveFormCompareList />
            </div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          {waveform.activity !== undefined && (
            <div style={{ marginLeft: 40 }}>
              <h5
                style={{ marginLeft: 15, color: "#189AB4", fontWeight: "bold" }}
              >
                Previous Iteration
              </h5>
              <table>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid white",
                        padding: 10,
                        backgroundColor: "#189AB4",
                        color: "white",
                      }}
                    >
                      Iteration
                    </th>

                    <th
                      style={{
                        border: "1px solid white",
                        padding: 10,
                        backgroundColor: "#189AB4",
                        color: "white",
                      }}
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {waveform.activity.percentage.map((act, i) => (
                    <tr key={act._id}>
                      <td
                        style={{
                          border: "1px solid white",
                          padding: 10,
                          backgroundColor: "#189AB4",
                          color: "white",
                        }}
                      >
                        {i + 1}
                      </td>

                      <td
                        style={{
                          border: "1px solid white",
                          padding: 10,
                          backgroundColor: "#189AB4",
                          color: "white",
                        }}
                      >
                        <h6
                          style={{
                            whiteSpace: "nowrap",
                            width: "120px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxLines: 2
                          }}
                        >
                          {act.length}
                        </h6>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activity.length !== 0 && (
            <div style={{ marginLeft: 16 }}>
              <h5 style={{ marginLeft: 2, color: "#189AB4" }}>
                Current Iteration
              </h5>
              <table>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid white",
                        padding: 10,
                        backgroundColor: "#189AB4",
                        color: "white",
                      }}
                    >
                      No.
                    </th>

                    <th
                      style={{
                        border: "1px solid white",
                        padding: 10,
                        backgroundColor: "#189AB4",
                        color: "white",
                      }}
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((act, i) => (
                    <tr key={act._id}>
                      <td
                        style={{
                          border: "1px solid white",
                          padding: 10,
                          backgroundColor: "#189AB4",
                          color: "white",
                        }}
                      >
                        {i + 1}
                      </td>

                      <td
                        style={{
                          border: "1px solid white",
                          padding: 10,
                          backgroundColor: "#189AB4",
                          color: "white",
                        }}
                      >
                        <h6
                          style={{
                            whiteSpace: "nowrap",
                            width: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {act.length}
                        </h6>
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
