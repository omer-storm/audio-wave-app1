import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

// function _base64ToArrayBuffer(base64) {
//   var binary_string = window.atob(base64);
//   var len = binary_string.length;
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes.buffer;
// }

export default function WaveForm({ url, color, color1, overlap }) {
  const waveformRef = useRef();
  const [wavesurfer, setwavesurfer] = useState(null);

  useEffect(() => {
    // const buffer = _base64ToArrayBuffer(url);

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
