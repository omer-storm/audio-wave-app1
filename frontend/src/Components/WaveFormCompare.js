import React, { useState } from "react";
import WaveFormPrompt from "./WaveFromPrompt";

function WaveFormCompare({ wave1 }) {
  const [wave2, setWave2] = useState([]);

  const getPercentage = () => {
    const percentage = [];
    let sum = 0;
    let calc = null;
    wave1.forEach((x, i) => {
      calc = (wave2[i] / x) * 100;
      if (!isNaN(calc) && calc < 120) percentage.push(calc);
    });
    percentage.forEach((x) => {
      sum = sum + x;
    });
    let average = sum / percentage.length;

    return isNaN(average) ? null : average.toFixed(2).toString() + "%";
  };

  return (
    <>
      <WaveFormPrompt color="green" color1={"blue"} setWave={setWave2} />
      <h4>{getPercentage()}</h4>
    </>
  );
}

export default WaveFormCompare;
