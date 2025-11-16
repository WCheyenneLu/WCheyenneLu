#Family Sorting Algorithm 🤝
Automated clustering of 200+ members into balanced families using weighted lexical similarity and ranked preferences

##Tech Stack
Python, Pandas, NumPy, Regex

##What It Does
- Reads member application data (CSV) containing preferences, interests, and ranked family choices
- Computes a weighted similarity score for each member–family pairing using:
- Lexical similarity between applicant keywords and family head descriptors (regex + stopword filtering)
- Performs greedy assignment to maximize overall similarity while maintaining balanced family sizes (≤11 per family) and outputs both detailed scores (result.csv) and final family assignments (finalResult.csv)

##Key Results
- Automated sorting reduced manual assignment time by ~80% (5 hrs → 1 hr)
- Balanced group distribution ensured fairness across 10 families
- Improved consistency by standardizing the evaluation of applicant interests and social compatibility
