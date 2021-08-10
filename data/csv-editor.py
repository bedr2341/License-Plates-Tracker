import pandas as pd

# Spotted states so far - 8/9/2021
spotted_states = ["Arizona", "Texas", "California", "New York", "Connecticut", "Minnesota", "Washington", "Illinois", "Colorado", "Michigan", "Alaska", "Utah", "New Mexico", "Tennessee", "Missouri", "Arkansas", "Maryland", "Kansas", "Massachusetts", "Florida", "Pennsylvania", "Virginia", "Georgia", "Idaho", "Nebraska", "Ohio", "New Jersey", "Oregon", "Delaware", "Oklahoma", "Nevada", "New Hampshire", "Wisconsin", "South Dakotah", "North Carolina", "Montana", "Kentucky", "Louisiana", "Indiana", "North Dakota", "Wyoming", "Iowa", "Vermont", "Hawaii", "West Virginia"]

df = pd.read_csv('./states_spotted.csv')

# initially I set all states to zero but I have commented this out now
# df["visited"] = 0

# Just run the script to increment the number
for state in spotted_states:
    df.loc[df["state"] == state, 'visited'] += 1

# Save the csv w/o the index
df.to_csv('./states_spotted.csv', index=False)