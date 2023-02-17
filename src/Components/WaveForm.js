import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveForm({ url }) {
  const waveformRef = useRef();
  const [wavesurfer, setwavesurfer] = useState(null);

  useEffect(() => {
    if (wavesurfer === null) {
      let wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "white",
        progressColor: "green",
      });
      wavesurfer.load(url);
      setwavesurfer(wavesurfer);
    } else {
      wavesurfer.load(url);
      setwavesurfer(wavesurfer);
    }
  }, [url, wavesurfer]);

  const onPlayPause = () => {
    wavesurfer.playPause();
  };

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", width: "800px" }} >
      <div ref={waveformRef} ></div>
      <button className="btn btn-success" onClick={onPlayPause}>
        Play/Pause
      </button>
    </div>
  );
}
