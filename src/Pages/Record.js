import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import WaveFormPrompt from "../Components/WaveFromPrompt";
import { useDispatch, useSelector } from "react-redux";
import { getPercentage } from "../features/comparision/comparisionSlice";

export default function Record() {
  const [Option, setOption] = useState("");

  const dispatch = useDispatch();
  const { pecentage } = useSelector((state) => state.comparision);
  console.log(pecentage);

  return (
    <div>
      <Navbar />

      <button
        onClick={() => {
          dispatch(getPercentage());
        }}
        className="btn btn-primary"
      >
        Get Percentage
      </button>
      <p>{pecentage} %</p>
      <div style={{ position: "relative", left: 100 }}>
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
              Option === "overlap" ? { position: "absolute", left: 0 } : {}
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
              Option === "overlap" ? { position: "absolute", left: 0 } : {}
            }
          >
            <WaveFormPrompt
              overlap={Option === "overlap" ? true : false}
              color="green"
              color1={"blue"}
              name="wave2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
