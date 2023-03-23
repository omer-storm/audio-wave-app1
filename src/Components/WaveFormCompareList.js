import React, { useState } from "react";
import WaveFormCompare from "./WaveFormCompare";
import { Plus } from "react-bootstrap-icons";

function WaveFormCompareList({ audioURL }) {
  const [iterator, setIterator] = useState([1]);

  return (
    <>
      {audioURL !== "" &&
        iterator.map((value) => (
          <div key={value}>
            <h5>Iteration no. {value}</h5>
            <WaveFormCompare audioURL={audioURL} />
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
    </>
  );
}

export default WaveFormCompareList;
