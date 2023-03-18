import React, { useState } from "react";
import WaveForm from "../Components/WaveForm";
import WaveFormPrompt from "./WaveFromPrompt";

function WaveFormCompare({ audioURL }) {
  const [Option, setOption] = useState("");

  return (
    <div>
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
      <WaveForm
        url={audioURL}
        // overlap={Option === "overlap" ? true : false}
        color={"red"}
        color1={"white"}
      />
      <WaveFormPrompt
        // overlap={Option === "overlap" ? true : false}
        color="green"
        color1={"blue"}
        name="wave2"
      />
    </div>
  );
}

export default WaveFormCompare;
