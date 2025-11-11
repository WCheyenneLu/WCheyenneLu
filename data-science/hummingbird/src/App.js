import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [stream, setStream] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [hummingSequence, setHummingSequence] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [finalPredictSong, setFinalPredictSong] = useState(null);

  const hummingCallbackRef = useRef();
  hummingCallbackRef.current = (noteNumber) => {
    // Append new note to the humming sequence array
    setHummingSequence((prevSeq) => [...prevSeq, noteNumber]);
  };

  async function classifyHumming(windowSequence) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence: windowSequence }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Predictions:", data.predictions);
      return data.predictions; // Now returns an array of predictions
    } catch (error) {
      console.error("Error classifying humming:", error);
      return null;
    }
  }
  useEffect(() => {
    console.log("Humming Sequence Updated: ", hummingSequence);
    if (hummingSequence.length >= 3) {
      const windowSequence = hummingSequence.slice(-3); // fixed window of 3 intervals
      classifyHumming(windowSequence).then((preds) => {
        if (preds) {
          setPredictions((prevPredictions) => [...prevPredictions, ...preds]);
        }
      });
    }
  }, [hummingSequence]);

  const longestAscendingChain = (orders) => {
    if (orders.length === 0) return 0;
    let maxChain = 1;
    let currentChain = 1;
    for (let i = 1; i < orders.length; i++) {
      if (orders[i] > orders[i - 1]) {
        currentChain++;
      } else {
        currentChain = 1;
      }
      maxChain = Math.max(maxChain, currentChain);
    }
    return maxChain;
  };

  // Whenever predictions change, analyze them to determine finalPredictSong.
  useEffect(() => {
    if (predictions.length === 0) {
      setFinalPredictSong(null);
      return;
    }
    // Group predictions by song.
    const grouped = predictions.reduce((acc, pred) => {
      const song = pred[0]; // first element is song
      const spliceOrder = pred[1]; // second element is splice_order
      if (!acc[song]) {
        acc[song] = [];
      }
      acc[song].push(spliceOrder);
      return acc;
    }, {});

    let bestSong = null;
    let bestChainLength = 0;
    for (const song in grouped) {
      // Assuming predictions are in detection order, otherwise sort grouped[song] ascending.
      const chainLength = longestAscendingChain(grouped[song]);
      if (chainLength >= 4 && chainLength > bestChainLength) {
        bestChainLength = chainLength;
        bestSong = song;
      }
    }
    setFinalPredictSong(bestSong);
  }, [predictions]);

  const toggleListening = async () => {
    if (!isListening) {
      try {
        console.log("Requesting microphone access...");
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(newStream);

        const audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();
        await audioCtx.resume(); // Ensure AudioContext starts properly
        setAudioContext(audioCtx);

        console.log("Microphone access granted. AudioContext started.");

        const source = audioCtx.createMediaStreamSource(newStream);

        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 2048; // Higher resolution for frequency analysis
        setAnalyser(analyserNode);
        source.connect(analyserNode);

        processAudio(analyserNode, audioCtx.sampleRate, (noteNumber) => {
          if (hummingCallbackRef.current) {
            hummingCallbackRef.current(noteNumber);
          }
        });

        setIsListening(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    } else {
      console.log("Stopping microphone...");
      stream?.getTracks().forEach((track) => track.stop());

      if (audioContext) {
        audioContext.suspend().then(() => {
          audioContext.close();
        });
      }

      setStream(null);
      setAudioContext(null);
      setAnalyser(null);
      setIsListening(false);
    }
  };

  return (
    <div className="App">
      <h1>🐦 Humming Bird 🐦</h1>
      <button className="button" onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <div>
        <h2>🎵 Final Predicted Song:</h2>
        <p>
          {finalPredictSong ? finalPredictSong : "⏳ Waiting for prediction..."}
        </p>
      </div>
    </div>
  );
}

export default App;

/* --- HELPER FUNCTIONS --- */

// Process Audio in Real-Time
// Process Audio in Real-Time with Interval Storage
function processAudio(analyser, sampleRate, onIntervalDetected) {
  const bufferLength = analyser.fftSize;
  const timeDomainData = new Float32Array(bufferLength);

  // We'll track the last detected pitch class (using modulo 12)
  let lastPitchClass = null;
  // Also use a minimal interval between detections to avoid rapid repeats.
  let lastDetectionTime = 0;
  const minDetectionInterval = 300; // in milliseconds

  function analyze() {
    analyser.getFloatTimeDomainData(timeDomainData);

    // Compute RMS (loudness)
    let rms = Math.sqrt(
      timeDomainData.reduce((sum, sample) => sum + sample * sample, 0) /
        bufferLength
    );
    let dB = 20 * Math.log10(rms);
    let currentTime = performance.now();

    // Only proceed if the signal is loud enough
    if (dB < -40) {
      requestAnimationFrame(analyze);
      return;
    }

    // Get frequency using AutoCorrelation (or fallback to FFT)
    let detectedFrequency = autoCorrelate(timeDomainData, sampleRate);
    if (detectedFrequency <= 0) {
      detectedFrequency = getDominantFrequency(analyser, sampleRate);
    }

    if (detectedFrequency > 0) {
      let noteNumber = frequencyToNoteNumber(detectedFrequency);
      // Convert to pitch class (ignore octave differences)
      let currentPitchClass = noteNumber % 12;

      // Only register if we have a new pitch class and sufficient time has passed
      if (
        (lastPitchClass === null || currentPitchClass !== lastPitchClass) &&
        currentTime - lastDetectionTime > minDetectionInterval
      ) {
        // If we already have a previous pitch, calculate the interval
        if (lastPitchClass !== null) {
          // Compute the interval modulo 12 (ensuring positive values)
          let interval = (currentPitchClass - lastPitchClass + 12) % 12;
          // Callback with the new interval
          onIntervalDetected(interval);
          console.log(
            `🎵 Detected interval: ${interval} (from ${lastPitchClass} to ${currentPitchClass})`
          );
        }
        // Update last pitch class and detection time
        lastPitchClass = currentPitchClass;
        lastDetectionTime = currentTime;
      }
    } else {
      console.log("No valid frequency detected.");
    }
    requestAnimationFrame(analyze);
  }
  analyze();
}

// AutoCorrelation for Pitch Detection
function autoCorrelate(buffer, sampleRate) {
  let SIZE = buffer.length;
  let bestOffset = -1;
  let bestCorrelation = 0;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // Ignore silence

  let lastCorrelation = 1;
  for (let offset = 1; offset < SIZE / 2; offset++) {
    let correlation = 0;

    for (let i = 0; i < SIZE / 2; i++) {
      correlation += buffer[i] * buffer[i + offset];
    }
    correlation = correlation / (SIZE / 2);

    if (correlation > 0.9 && correlation > lastCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    } else if (correlation < lastCorrelation) {
      break;
    }

    lastCorrelation = correlation;
  }

  if (bestCorrelation > 0.01) {
    let frequency = sampleRate / bestOffset;
    return frequency;
  }

  return -1;
}

// FFT-Based Pitch Detection
function getDominantFrequency(analyser, sampleRate) {
  let bufferLength = analyser.frequencyBinCount;
  let frequencyData = new Uint8Array(bufferLength);

  analyser.getByteFrequencyData(frequencyData);

  let maxIndex = 0;
  let maxAmplitude = 0;

  for (let i = 0; i < bufferLength; i++) {
    if (frequencyData[i] > maxAmplitude) {
      maxAmplitude = frequencyData[i];
      maxIndex = i;
    }
  }

  let dominantFrequency = (maxIndex * sampleRate) / (2 * bufferLength);
  return dominantFrequency > 20 ? dominantFrequency : -1; // Ignore sub-audible frequencies
}

// Convert frequency to MIDI note number
function frequencyToNoteNumber(frequency) {
  return Math.round(12 * Math.log2(frequency / 440) + 69);
}

// Convert MIDI note number to note name
function noteNumberToNoteName(noteNumber) {
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return noteNames[noteNumber % 12] + Math.floor(noteNumber / 12 - 1);
}
