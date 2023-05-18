import React, { useState } from "react";
import WaveFormPrompt from "./WaveFromPrompt";

function WaveFormCompare({ wave1 }) {
  const [wave2, setWave2] = useState([]);

  const percentage = (function getPercentage() {
    const percentage = [];
    let sum = 0;
    let calc = null;
    wave1.forEach((x, i) => {
      calc = (wave2[i] / x) * 100;
      if (!isNaN(calc)) percentage.push(calc);
    });
    percentage.forEach((x) => {
      sum = sum + x;
    });
    let average = sum / percentage.length;

    return isNaN(average) ? null : average.toFixed(2).toString() + "%";
  })();

  const length = (function getLength() {
    const length = (wave2.length / wave1.length) * 100;

    return length.toFixed(2).toString() + "%";
  })();

  return (
    <>
      <WaveFormPrompt
        color="green"
        color1={"blue"}
        setWave={setWave2}
        percentage={percentage}
        length={length}
      />
      {percentage !== null && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <h4 style={{ margin: 10 }}>Peaks: {percentage}</h4>
          <h4 style={{ margin: 10 }}> Length: {length}</h4>
        </div>
      )}
    </>
  );
}

export default WaveFormCompare;
