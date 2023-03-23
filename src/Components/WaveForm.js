import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Pause, Play } from "react-bootstrap-icons";

export default function WaveForm({ url, color, color1, setWave }) {
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

      wavesurfer.on("ready", function () {
        // get peaks
        const getPeaks = wavesurfer.backend.getPeaks(600, 0, 600);
        const peaks = [];
        getPeaks.forEach((x) => {
          x = Math.abs(x);
          if (x > 0.1) {
            peaks.push(x);
          }
        });
        setwavesurfer(wavesurfer);
        setWave(peaks);
      });
    }
  }, [url, wavesurfer, color, color1, setWave]);

  const onPlayPause = () => {
    wavesurfer.playPause();
  };

  return (
    <>
      <div
        style={{
          width: "600px",
          height: "128px",
          border: "2px solid #0275d8",
        }}
      >
        <div ref={waveformRef}></div>
        <button
          className="btn btn-sm btn-primary"
          onClick={onPlayPause}
          style={{ position: "relative", top: -70, left: -105 }}
        >
          <Play size={30} />/
          <Pause size={30} />
        </button>
      </div>
    </>
  );
}
