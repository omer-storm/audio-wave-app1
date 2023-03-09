import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useDispatch } from "react-redux";
import { setComparision } from "../features/comparision/comparisionSlice";
import { Pause, Play } from "react-bootstrap-icons";

export default function WaveForm({ url, color, color1, overlap, name }) {
  const waveformRef = useRef();
  const [wavesurfer, setwavesurfer] = useState(null);
  const dispatch = useDispatch();

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
        const getPeaks = wavesurfer.backend.getPeaks(200, 0, 200);
        const peaks = [];
        getPeaks.forEach((x) => {
          x = Math.abs(x);
          if (x > 0.1) {
            peaks.push(x);
          }
        });
        dispatch(setComparision({ name, peaks }));
        setwavesurfer(wavesurfer);
      });
    } else {
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
        dispatch(setComparision({ name, peaks }));
      });
      setwavesurfer(wavesurfer);
    }
  }, [url, wavesurfer, color, color1, name, dispatch]);

  const onPlayPause = () => {
    wavesurfer.playPause();
  };

  return (
    <div>
      <div ref={waveformRef}></div>

      {!overlap && (
        <button
          className="btn btn-sm btn-primary"
          onClick={onPlayPause}
          style={{ position: "relative", top: -70, left: -105 }}
        >
          <Play size={30} />/
          <Pause size={30} />
        </button>
      )}
    </div>
  );
}
