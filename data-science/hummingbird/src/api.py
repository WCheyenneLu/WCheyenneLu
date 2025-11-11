from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import librosa  # Ensure librosa and any dependencies are installed
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from python import melody_hash
from python import generate_stored_sequences


# --- DTW, knn_classify, and compute_dtw_distance functions here ---

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Add your React app's URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def compute_dtw_distance(seq1, seq2):
    seq1 = seq1.reshape(1, -1)
    seq2 = seq2.reshape(1, -1)
    D, wp = librosa.sequence.dtw(X=seq1, Y=seq2, metric='euclidean')
    dtw_distance = D[-1, -1]
    return dtw_distance

def knn_classify(test_sequence, stored_sequences, k=3):
    """
    Compare test_sequence to each stored sequence and return an array of predictions.
    Each stored sequence is a tuple: ([interval1, interval2, interval3], metadata)
    where metadata is a list of (song_name, splice_order) tuples.
    """
    distances = []
    for stored_seq, metadata in stored_sequences:
        dtw_distance = compute_dtw_distance(np.array(stored_seq), np.array(test_sequence))
        distances.append((dtw_distance, metadata))
    distances.sort(key=lambda x: x[0])
    # Get the top k nearest neighbors
    nearest = distances[:k]
    predictions = []
    for dist, meta in nearest:
        # Extend predictions with all metadata from this neighbor
        predictions.extend(meta)
    return predictions


# Generate stored sequences using the external module.
stored_sequences = generate_stored_sequences()
# Dummy stored_sequences (replace with your actual stored data)
#stored_sequences = [
    #([4, 3, 5], "Beethoven Symphony No. 5"),
   # ([3, 2, 4], "Mozart Eine kleine Nachtmusik"),
    # ... additional sequences
#]

# Define request model for input JSON
class HummingSequence(BaseModel):
    sequence: list  # list of intervals (e.g., [4, 3, 5])

@app.post("/api/classify")
async def classify_humming(data: HummingSequence):
    test_sequence = np.array(data.sequence)
    if test_sequence.size == 0:
        raise HTTPException(status_code=400, detail="Empty sequence provided")
    predictions = knn_classify(test_sequence, stored_sequences, k=3)
    return {"predictions": predictions}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
