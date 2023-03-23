import React, { useState } from "react";
import WaveFormCompare from "./WaveFormCompare";
import { Plus } from "react-bootstrap-icons";

function WaveFormCompareList({ audioURL }) {
  const [iterator, setIterator] = useState([1]);
  const [Option, setOption] = useState("");

  return (
    <>
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
      {audioURL !== "" &&
        iterator.map((value) => (
          <div key={value}>
            <h5 style={{ marginLeft: 100 }}>Iteration no. {value}</h5>
            <WaveFormCompare audioURL={audioURL} />
          </div>
        ))}
      <button
        className="btn btn-primary"
        style={{ marginLeft: 650 }}
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
