import os
import librosa
import numpy as np
from collections import defaultdict


# Load MP3 file

# y, sr = librosa.load("/Users/cheye/Desktop/UCLA/DSU/Project/project/src/Beethoven_Symphony5a.mp3")

music_dir = "/Users/cheye/Desktop/UCLA/DSU/Project/project/src/pieces"
# Sliding window parameters
window_size = 0.4  # 400ms
hop_size = window_size / 2  # 50% overlap (200ms)

# # Convert window size to samples
# window_samples = int(window_size * sr)
# hop_samples = int(hop_size * sr)

# Hashtable to store encoded sequences
melody_hash = defaultdict(list)  # {encoded_sequence: ["Song Name"]}

def get_peak_frequencies(y, sr, start, end):
    """Extracts peak frequencies from a segment of audio."""
    segment = y[start:end]  # Extract window segment
    frequencies, magnitudes = librosa.piptrack(y=segment, sr=sr)
    
    # Get dominant frequencies per frame
    peaks = []
    for t in range(frequencies.shape[1]):
        idx = magnitudes[:, t].argmax()  # Find peak index
        peak_freq = frequencies[idx, t]
        if peak_freq > 0:
            peaks.append(peak_freq)
    
    return peaks

def encode_intervals_as_letters(frequencies):
    """Convert peak frequencies into interval-based letter encoding."""
    
    # Convert frequencies to MIDI numbers
    midi_notes = librosa.hz_to_midi(frequencies)
    
    # Remove NaN values
    midi_notes = midi_notes[~np.isnan(midi_notes)]
    
    # Compute intervals (difference between consecutive notes)
    intervals = np.diff(midi_notes).astype(int)
    
    
    # Map intervals to letters
    interval_to_letter = {i: chr(96 + i) for i in range(1, 13)}
    
    # Convert intervals to letters
    encoded_sequence = ''.join(interval_to_letter.get(i, '?') for i in intervals if i in interval_to_letter)
    
    return encoded_sequence

def letters_to_numbers(letter_sequence):
    """
    Convert a letter-encoded sequence to a numeric sequence.
    For example: 'abc' -> [1, 2, 3]
    """
    return [ord(ch) - 96 for ch in letter_sequence if 'a' <= ch <= 'z']

def build_melody_hash():
# Process each MP3 file in the directory
    for filename in os.listdir(music_dir):
        if filename.lower().endswith('.mp3'):
            file_path = os.path.join(music_dir, filename)
            print(f"Processing {filename}...")
            y, sr = librosa.load(file_path)
        
            # Convert window size and hop size to samples
            window_samples = int(window_size * sr)
            hop_samples = int(hop_size * sr)
        
            splice_order = 1  # Track the order of the sequence within the song
        
            # Process audio in a sliding window fashion
            for start in range(0, len(y) - window_samples, hop_samples):
                end = start + window_samples
                peak_frequencies = get_peak_frequencies(y, sr, start, end)
            
                if len(peak_frequencies) > 1:
                # Get the letter-encoded sequence first
                    encoded_sequence = encode_intervals_as_letters(peak_frequencies)
                
                    if encoded_sequence:
                    # Convert the letter sequence to a numeric sequence
                        number_sequence = letters_to_numbers(encoded_sequence)
                    
                    # Use a tuple for the hash key (lists are not hashable)
                        melody_hash[tuple(number_sequence)].append((filename, splice_order))
            
                splice_order += 1


def compute_dtw_distance(seq1, seq2):
    """
    Compute the DTW distance between two numerical sequences.
    Sequences should be 1D numpy arrays.
    """
    # Reshape into 2D arrays with shape (features, frames) because librosa's dtw expects that
    # Here each sequence has one feature.
    seq1 = seq1.reshape(1, -1)
    seq2 = seq2.reshape(1, -1)
    
    # Compute the accumulated cost matrix and optimal warping path
    D, wp = librosa.sequence.dtw(X=seq1, Y=seq2, metric='euclidean')
    
    # The DTW distance is the cost at the end of the path
    dtw_distance = D[-1, -1]
    return dtw_distance

def knn_classify(test_sequence, stored_sequences, k=5):
    """
    Classify the test_sequence by comparing it to stored_sequences.
    - test_sequence: numpy array of intervals from the humming input.
    - stored_sequences: list of tuples [(numeric_sequence, label), ...]
    - k: number of nearest neighbors to consider.
    
    Returns the most common label among the K nearest neighbors.
    """
    distances = []
    
    for stored_seq, label in stored_sequences:
        # Compute DTW distance between test and stored sequence
        dtw_distance = compute_dtw_distance(np.array(stored_seq), np.array(test_sequence))
        distances.append((dtw_distance, label))
    
    # Sort by distance (ascending order)
    distances.sort(key=lambda x: x[0])
    
    # Select the labels of the k nearest sequences
    nearest_labels = [label for (_, label) in distances[:k]]
    
    # Majority vote: here using a simple frequency count
    label_counts = {}
    for lbl in nearest_labels:
        label_counts[lbl] = label_counts.get(lbl, 0) + 1
        
    # Return the label with the highest count
    predicted_label = max(label_counts.items(), key=lambda x: x[1])[0]
    return predicted_label

def generate_stored_sequences():
    stored_sequences = []
    for seq_tuple, metadata in melody_hash.items():
        # Only include sequences that have exactly 3 numbers
        if len(seq_tuple) == 3 and metadata:
            # Instead of taking only the first metadata, store the entire list.
            stored_sequences.append((list(seq_tuple), metadata))
    return stored_sequences

#predicted_song = knn_classify(humming_sequence, stored_sequences, k=3)
#print("Predicted song:", predicted_song)
# splice_order = 1
# # Process audio in a sliding window fashion
# for start in range(0, len(y) - window_samples, hop_samples):
#     end = start + window_samples
#     peak_frequencies = get_peak_frequencies(y, sr, start, end)  # Get melody
    
#     if len(peak_frequencies) > 1:  # Ensure valid melody
#         encoded_sequence = encode_intervals_as_letters(peak_frequencies)
        
#         if encoded_sequence:  # Only store if non-empty
#             melody_hash[encoded_sequence].append(("Beethoven Symphony No. 5", splice_order))  
#   # Store in hashtable
#     splice_order += 1

# Print stored sequences
#for seq, songs in melody_hash.items():
    #print(f"Sequence: {seq} -> Songs: {songs}")
build_melody_hash()
