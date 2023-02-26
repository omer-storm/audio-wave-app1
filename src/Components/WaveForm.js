import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveForm({ url, color, color1, overlap }) {
  const waveformRef = useRef();
  const [wavesurfer, setwavesurfer] = useState(null);

  useEffect(() => {
    if (wavesurfer === null) {
      let wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: color,
        progressColor: color1,
      });
      wavesurfer.load(url);
      setwavesurfer(wavesurfer);
    } else {
      wavesurfer.load(url);
      setwavesurfer(wavesurfer);
    }
  }, [url, wavesurfer, color, color1]);

  const onPlayPause = () => {
    wavesurfer.playPause();
  };

  return (
    <div>
      <div ref={waveformRef}></div>
      {!overlap && (
        <button className="btn btn-success" onClick={onPlayPause}>
          Play/Pause
        </button>
      )}
    </div>
  );
}
