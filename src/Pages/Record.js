import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import WaveFormPrompt from "../Components/WaveFromPrompt";

export default function Record() {
  const [Option, setOption] = useState("");

  return (
    <div>
      <Navbar />
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
              ? { position: "absolute", left: 0,  }
              : {}
          }
        >
          <WaveFormPrompt />
        </div>
        <div
          style={
            Option === "overlap"
              ? { position: "absolute", left: 0,  }
              : {}
          }
        >
          <WaveFormPrompt />
        </div>
      </div>
    </div>
  );
}
