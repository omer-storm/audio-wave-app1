import React, { useState } from "react";
import WaveForm from "../Components/WaveForm";
import WaveFormPrompt from "./WaveFromPrompt";

function WaveFormCompare({audioURL}) {
  const [wave1, setWave1] = useState([]);
  const [wave2, setWave2] = useState([]);
  const [overlap, setOverlap] = useState(false);

  const getPercentage = () => {
    const percentage = [];
    let sum = 0;
    let calc = null;
    wave1.forEach((x, i) => {
      calc = (x / wave2[i]) * 100;
      if (!isNaN(calc)) percentage.push(calc);
    });
    percentage.forEach((x) => {
      sum = sum + x;
    });
    let average = sum / percentage.length;

    return isNaN(average) ? null : average.toFixed(2).toString() + "%";
  };

  return (
    <>
      <div style={overlap ? { position: "relative" } : null}>
        <div style={overlap ? { position: "absolute", left: 0, top: 0 } : null}>
          <WaveForm
            url={audioURL}
            color={"red"}
            color1={"white"}
            setWave={setWave1}
          />
        </div>

        <div style={overlap ? { position: "absolute", left: 0, top: 0 } : null}>
          <WaveFormPrompt color="green" color1={"blue"} setWave={setWave2} />
        </div>
      </div>
      <h4 className="text-primary" style={overlap ? { marginTop: 150 } : null}>
        {getPercentage()}
      </h4>

      {wave2.length !== 0 ? (
        <button
          style={{ position: "relative", marginTop: -5, marginLeft: -1 }}
          onClick={() => {
            setOverlap(!overlap);
          }}
          className="btn btn-primary"
        >
          Overlap
        </button>
      ) : null}
    </>
  );
}

export default WaveFormCompare;
