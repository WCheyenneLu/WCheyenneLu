
import numpy as np
import pandas as pd
import re

result = pd.DataFrame()
finalResult = pd.DataFrame()
sortedResult = pd.DataFrame()

# Read raw application CSV (expects 'fam_app.csv' in working directory)
raw = pd.read_csv('fam_app.csv')

# Normalize column names from the original form source
raw.columns = ['timestamp', 'email', 'full_name', 'phone', 
    'insta','gender', 'year', 'major', 'paid', 
    'payment_photo', 'housing', 'host', 'car', 'carpool',
    'hobbies', 'career', 'fam_experience', 'fam_events', 'wholesome',
    'wholesome_fam', 'event_dinner', 'event_kickback', 'event_outdoor', 'event_beach', 
    'event_picnic', 'event_boba', 'event_cooking', 'event_games', 'event_study',
    'event_sports', 'meet_fam_heads', 'fam_1','fam_2', 'fam_3',
    'fam_4','fam_5','fam_6','fam_7','fam_8','fam_9','fam_10','friend', 'questions']
membership = pd.DataFrame({'paid':raw['paid'], 'payment_photo':raw['payment_photo']})

# Drop identifiers/payment/admin fields; keep only features used for scoring
data = raw.drop(['timestamp', 'email', 'full_name', 'phone', 'insta','paid', 'payment_photo', 'questions', 'friend'], axis = 1 )

# -------------------------------
# Initialize scoring/result frames
# -------------------------------

result ['Full Name'] = raw['full_name']
result ['Phone Number'] = raw ['phone']
result ['Instagram'] = raw ['insta']

# Initialize family score columns (floating scores that accumulate)
for i in range(1, 11):
    result[f'Fam {i}'] = pd.Series([0.0] * raw.shape[0])

TOTAL_APPLICANTS  = result.shape[0]
MAX_PER_FAM = 11
FAMS = 10


# finalResult will hold the assigned names per family; row 0 stores the current count
for i in range(1, 11):
    finalResult[f'Fam {i}'] = pd.Series(['-'] * (MAX_PER_FAM + 1))

# -------------------------------
# 1) Ranking-based score component
# -------------------------------

def change_score_ranking(index, row):
    """
    Convert each applicant's ranked family preferences (cols 24..33 in `data`)
    into additive scores for Fam 1..Fam 10 in `result`.
    Highest rank (10) adds 1, down to rank (1) adding 10 (inverse weighting).
    """
    result_col = 3
    for curr_fam in range(24,34):
        current_fam_rank = row.iloc[curr_fam]
        if current_fam_rank == 10:
            result.iloc[index,result_col] +=1
        elif current_fam_rank == 9:
            result.iloc[index,result_col] +=2
        elif current_fam_rank == 8:
            result.iloc[index,result_col] +=3
        elif current_fam_rank == 7:
            result.iloc[index,result_col] +=4
        elif current_fam_rank == 6:
            result.iloc[index,result_col] +=5
        elif current_fam_rank ==5:
            result.iloc[index,result_col] +=6
        elif current_fam_rank ==4:
            result.iloc[index,result_col] +=7
        elif current_fam_rank ==3:
            result.iloc[index,result_col] +=8
        elif current_fam_rank ==2:
            result.iloc[index,result_col] +=9
        elif current_fam_rank ==1:
            result.iloc[index,result_col] +=10
        result_col +=1

# -------------------------------
# 2) Experience/interest keyword matching component
#    (lexical overlap with fam head descriptors)
# -------------------------------

famhead1 = ["boba", "matcha", "coffee", "beach", "alcohol", "kickbacks", "study", "RnB", "chemistry", "psychology", "taiwan", "clubbing", "music", "karaoke","night", "talk", "yap", "yapping", "gym", "restaurants", "food"]
famhead2 = ["traveling", "cats", "cars", "baking", "aesthetic", "lana", "food", "views", "vibe", "explore", "cooking", "beach", "biology", "microbiology", "buisness", "economics", "bizecon", "bay", "food", "brunch", "pre-med", "concert", "engineering", "violin", "orchestra", "parks", "editing", "video-editing", "film"]
famhead3 = ["linguistics", "CS", "midwest", "Wisconsin", "tennis", "sports", "badminton", "hikes", "sunset", "classical", "music", "sawtelle", "bowling", "Canada", "Vancouver", "sleep", "nap", "journalling", "tea", "movie"]
famhead4 = ["taiwan", "outgoing", "friendly", "food", "trips", "vibing", "hiking", "entertainment", "eating", "humor", "cycling", "triathlon", "acting", "korean", "Korea", "Taylor", "Swift", "pop", "music", "kpop", "kpop", "kpop", "martial", "arts", "taekwondo", "lift", "lifting", "romance", "read"]
famhead5 = ["linguistics", "computer science", "CS", "statistics", "data", "climbing", "food", "sports", "run", "soccer", "beach", "mahjong", "Pre-Human", "biology", "York", "concerts", "raves", "romcom", "hike", "talk", "pickleball", "writing", "english", "society", "HBS", "Taylor", "Swift"]
famhead6 = ["Computer Science", "CS", "cats", "wordhunt", "r&b", "art", "tatoos", "design", "anime", "thrifting", "poker", "explore", "outdoors", "music", "restaurants", "beach","hiking", "flea", "markets", "charcuterie", "polisci", "political", "jazz", "jewlery", "Sawtelle", "century", "city"]
famhead7 = ["Computer Science", "CS", "comedy", "Business", "Economics", "bizecon", "climbing", "goofy", "animation", "anime", "coffee", "music", "painting", "art", "tea", "craft", "keyboards", "PC", "computers", "acting", "taiwan", "anime", "video", "games", "anime", "baseball", "cars", "fragrances", "food", "Sawtelle", "TCN"]
famhead8 = ["pre-med", "MCDB", "volunteering","chill", "singing", "gym", "basketball", "outgoing", "fun", "social", "restaurants", "food", "culture", "new", "extraverted", "lively", "friendly"]
famhead9 = ["Sociology", "transfer", "bay", "sushi", "strawberry", "tea", "lychee", "coffee", "plushies", "boba", "food", "K-Town", "sawtelle", "kickbacks", "psychology", "Taipei", "movies", "shows", "basketball", "restaurants", "drives", "spontaneous", "gym", "cafes", "cafe"]
famhead10 = ["CS", "Computer Science", "Seattle", "East", "sports", "hikig", "kayaking", "mahjong", "poker", "music", "thriller", "movies", "food", "eating", "travelling", "eat", "beach", "horror", "nights", "study", "kbbq", "bbq", "walks", "kickbacks", "spontaneous", "mechanical", "engineering", "bay", "games", "video", "genuine", "thrifting", "exercise", "wine", "concerts", "poker", "gambling", "poker", "games"]
famheadExperiences = [famhead1, famhead2, famhead3, famhead4, famhead5, famhead6, famhead7, famhead8, famhead9, famhead10]
famheadWholesome = [1,4,3,2,5,1,2,9,3,4] # Desired "wholesome" vibe per family (1–10 scale)


def combineExperienceWords(row):
    """
    Extract and concatenate keyword tokens from the applicant's free-text fields.
    Uses filter_split_words() for tokenization and stopword removal.
    Fields used: hobbies, career, fam_experience, fam_events (by column index).
    """
    arrayOfWords = filter_split_words(row.iloc[2]) + filter_split_words(row.iloc[7]) + filter_split_words(row.iloc[8])+ filter_split_words(row.iloc[9])
    return arrayOfWords

def filter_split_words(paragraph):
    """
    Simple tokenizer with lowercase stopword removal using regex word boundaries.
    """
    stopwords = {"is", "of","an", "it", "be", "into", "and", "in", "a", "this", "that", "are", "to", "going", "always", "something", "for", "looking"}
    if isinstance(paragraph, str): 
        words_list = re.findall(r'\b\w+\b', paragraph)
        filtered_words_list = [word for word in words_list if word.lower() not in stopwords]
    else: 
        filtered_words_list= []
    return filtered_words_list

def compare_experiences(famhead, person_filtered):
    """
    Compute lexical overlap proportion between applicant tokens and a family's keyword list.
    Returns: matches / total applicant tokens (simple lexical similarity).
    """
    count = 0
    for word in person_filtered:
        for compareWord in famhead:
            if word.lower()==compareWord.lower():
                count+=1        
    percent_match = count/(len(person_filtered))
    return percent_match

def change_score_experiences(index, row):
    """
    Add experience/interest overlap scores to each family's total for the applicant.
    """
    personExperiences = combineExperienceWords(row)
    result_col = 3
    for famhead in famheadExperiences:
        experienceScore = compare_experiences( famhead, personExperiences)
        result.iloc[int(index), result_col] += experienceScore
        result_col +=1

# -------------------------------
# 3) "Wholesome" vibe proximity component
# -------------------------------

def change_score_wholesome(index,row):
    """
    Average the applicant's wholesome ratings and reward proximity to each family's target.
    Exact match: +0.15, ±0.5: +0.10, ±1.0: +0.05 (else 0).
    """
    result_col = 3
    personWholesome = (row.iloc[11] + row.iloc[12])/2
    for famheadScore in famheadWholesome:
        if famheadScore == personWholesome:
            result.iloc[int(index), result_col] += 0.15
        elif (famheadScore+0.5 == personWholesome) or (famheadScore - 0.5 == personWholesome):
            result.iloc[int(index), result_col] +=0.1
        elif (famheadScore +1 == personWholesome) or (famheadScore - 1 == personWholesome):
            result.iloc[int(index), result_col] += 0.05
        result_col +=1

# -------------------------------
# Apply scoring components to all applicants (one-time processing)
# -------------------------------

for index, series in data.iterrows():
    change_score_ranking(index, series)
    change_score_experiences(index,series)
    change_score_wholesome(index,series)

# Initialize placement counters in finalResult (row 0 holds counts)
for fam in range(0,FAMS):
    finalResult.iloc[0,fam] = 0

# -------------------------------
# Final assignment respecting capacity & no-duplicate constraints
# -------------------------------

def finalSortFam():

    """
    Greedy assignment loop:
    - Iteratively take the next-highest score below the previous max (`prevHighestRating`)
    - Place the applicant into that family if:
        * applicant not already placed
        * family has not exceeded MAX_PER_FAM
    - Track per-family counts in finalResult row 0
    """
    
    def find_target_indicies(df, target, skip_n):
        """
        Find the (row, col) of the Nth (skip_n) occurrence of 'target' in a DataFrame.
        Used to iterate ties deterministically.
        """
        count = 0
    
        for (row_idx, col_idx), value in df.stack().items():
            if value == target:
                if count >= skip_n:
                    return (row_idx, col_idx)  # Return immediately after skipping n instances
                count += 1

        return None 
    
    n = (result.shape[0])*FAMS
    prevHighestRating = 50
    for ratings in range(0,n):
        currHighestRating= 0
        for row in range(0,result.shape[0]):
            for col in range(3,(3 + FAMS)):
                if ((result.iloc[row,col] > currHighestRating) and result.iloc[row,col]< prevHighestRating):
                    currHighestRating = result.iloc[row,col]
        instances = 0
        for row in range (0,result.shape[0]):
            for col in range(3,(3+FAMS)):
                if (result.iloc[row,col] == currHighestRating):
                    instances+=1            
        for i in range(0,instances):
            highestIndex = find_target_indicies(result, currHighestRating,i)
            highestRow = highestIndex[0]
            highestCol = highestIndex[1]
            
            duplicated = False
            for row2 in range(0,finalResult.shape[0]):
                for col2 in range(0,FAMS):
                    if (result.iloc[highestRow,0] == finalResult.iloc[row2,col2]):
                        duplicated = True
            tooManyPeople = False
            if (finalResult.loc[0,highestCol] >= MAX_PER_FAM):
                tooManyPeople = True
            if (duplicated == False and tooManyPeople == False):
                nextRow = finalResult.loc[0,highestCol]+1
                finalResult.loc[nextRow,highestCol] = result.iloc[highestRow,0]
                finalResult.loc[0,highestCol]+=1 
        
        prevHighestRating = currHighestRating

# Run final assignment and export results (one-time outputs)

finalSortFam()
print(result)
print(finalResult)
result.to_csv('result.csv', header=False, index=False)
finalResult.to_csv('finalResult.csv', header=False, index=False)

# Notes for manual post-processing (outside of this script's logic):
# - membership payment
# - gender checks
# - lock-ins (manual constraints)
# - friend pairs (keep-together constraints)