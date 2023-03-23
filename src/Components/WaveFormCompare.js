import React, { useState } from "react";
import WaveForm from "../Components/WaveForm";
import WaveFormPrompt from "./WaveFromPrompt";

function WaveFormCompare({ audioURL }) {
  const [wave1, setWave1] = useState([]);
  const [wave2, setWave2] = useState([]);

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

    return isNaN(average) ? null : average.toFixed(2).toString()+'%';
  };

  return (
    <div>
      <WaveForm
        url={audioURL}
        color={"red"}
        color1={"white"}
        setWave={setWave1}
      />
      <WaveFormPrompt
        color="green"
        color1={"blue"}
        setWave={setWave2}
      />
      <h6 style={{position: 'relative', left: 650}}>{getPercentage()}</h6>
    </div>
  );
}

export default WaveFormCompare;
