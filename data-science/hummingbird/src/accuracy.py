import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data_k3 = {
    "Piece": ["Brandenburg", "Fur Elise", "Moonlight Sonata", "Beethoven 5", "Bizet Habanara", "Chopin Etude 3", "Fantasie Im", "Nocturn C# minor", "nocturn op 9 no 2", "Chopin Polonaise op 53"],
    "trial1": [0,0,0,1,0,0,0,0,0,0],
    "trial2": [0,0,0,0,0,0,0,0,0,0],
    "trial3": [0,0,0,0,0,0,1,0,0,0]
}

data_k4 = {
    "Piece": ["ChopinWaltzC#m", "ChopinBallade1", "ClairedeLune", "DebussyL'isleJoyeuse", "DvorakSymphony9", "DvorakHumoresque", "EineKleinNact", "WeddingMarc", "Bumblebee", "PeerGynt"],
    "trial1": [0,0,0,0,0,0,0,0,0,0],
    "trial2": [0,0,0,0,0,0,0,0,0,0],
    "trial3": [0,0,0,0,0,0,1,0,0,0]
}

data_k5_chain_4 = {
    "Piece": ["Handel: messiah", "Handel water music", "Handel Music for the Royal Fireworks", "Bach preldue no 1 C M", "Jesus joy of man\'s Desiring", "Brahms Hungarian Dance", "Listz Hungarian Rhapsody", "Mahler symphony 5", "Mendhelsohn song without words", "Mendelsohn violin concerto e minor"],
    "trial1": [0,0,0,0,0,0,0,0,0,1],
    "trial2": [0,0,0,0,1,0,0,1,0,0],
    "trial3": [1,0,0,0,0,0,0,1,0,1]
}

df_k3 = pd.DataFrame(data_k3).set_index("Piece")
df_k4 = pd.DataFrame(data_k4).set_index("Piece")
df_k5_chain_4 = pd.DataFrame(data_k5_chain_4).set_index("Piece")

# Reset index so that 'song' becomes a column
df_k3_reset = df_k3.reset_index()
df__k4_reset = df_k4.reset_index()
df_k5_chain_4_reset = df_k5_chain_4.reset_index()

# Melt the DataFrame so that each trial becomes a separate row entry
df_melted = df_k3_reset.melt(id_vars="Piece", var_name="trial", value_name="correct")

# plt.figure(figsize=(10, 6))
# sns.barplot(x="Piece", y="correct", hue="trial", data=df_melted, palette="viridis")
# plt.title("Binary Prediction Outcomes per Song (Grouped Bar Chart)")
# plt.ylabel("Correct Prediction (1=Correct, 0=Incorrect)")
# plt.ylim(0, 1.1)
# plt.show()

# plt.figure(figsize=(8, 6))
# sns.heatmap(df_k3, annot=True, cmap="YlGnBu", cbar=False, vmin=0, vmax=1)
# plt.title("Heatmap of Binary Predictions per Song")
# plt.xlabel("Trial")
# plt.ylabel("Song")
# plt.show()

plt.figure(figsize=(10, 6))
sns.lineplot(x="trial", y="correct", hue="Piece", data=df_melted, marker="o")
plt.title("Trend of Binary Predictions Across Trials")
plt.xlabel("Trial")
plt.ylabel("Correct Prediction (1=Correct, 0=Incorrect)")
plt.ylim(0, 1.1)
plt.show()