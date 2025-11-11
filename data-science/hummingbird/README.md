# Hummingbird 🐦
Real-time classical music recognition from hummed input 

## Tech Stack
Python, numpy, librosa, React.js, Fast API, 

## What It Does
- Converts humming into peak frequency sequences by detecting dominant spectral peaks
- Uses a sliding window approach (400 ms window, 50% overlap) to smooth out noise, stabilize pitch detection, and prevent brief background sounds from influencing the encoding
- Stores reference melodies in a hash table indexed by their encoded interval sequences, enabling fast lookup and fuzzy matching
- Compares hummed input sequences to stored melodies using Dynamic Time Warping (DTW) to allow for tempo differences and imperfect alignment
- Classifies the hummed melody using K-nearest neighbors (KNN) based on DTW similarity scores, returning the most likely song candidates
- Provides a REST API interface that can be consumed by a frontend (React)
  
## Key Results
- Classification model achieved an accuracy of approximately ~20% on the current dataset
- DTW successfully captured relative melodic shape rather than requiring exact pitch matches
- Performance varied heavily based on:
  - Length of the hummed input sequence
  - Noise / variability in human humming
  - Musical similarity between songs in the stored dataset

