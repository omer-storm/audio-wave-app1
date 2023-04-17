import React, { useState } from "react";
import WaveFormCompare from "./WaveFormCompare";
import { Plus } from "react-bootstrap-icons";

function WaveFormCompareList({ audioURL, wave1 }) {
  const [iterator, setIterator] = useState([1]);

  return (
    <div>
     <h2>Iterations:</h2>
      {audioURL !== "" &&
        iterator.map((value) => (
          <div key={value}>
            <WaveFormCompare wave1 ={wave1}/>
          </div>
        ))}
      <button
        className="btn btn-primary"
        style={{ marginLeft: 550}}
        onClick={() => {
          setIterator([...iterator, iterator.length + 1]);
        }}
      >
        <Plus size={30} />
      </button>
    </div>
  );
}

export default WaveFormCompareList;
