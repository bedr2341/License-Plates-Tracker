import pandas as pd

spotted_states = ["Arizona", "Texas", "California", "New York", "Connecticut", "Minnesota", "Washington", "Illinois", "Colorado", "Michigan", "Alaska", "Utah", "New Mexico", "Tennessee", "Missouri", "Arkansas", "Maryland", "Kansas", "Massachusetts", "Florida", "Pennsylvania", "Virginia", "Georgia", "Idaho", "Nebraska", "Ohio", "New Jersey", "Oregon", "Delaware", "Oklahoma", "Nevada", "New Hampshire", "Wisconsin", "South Dakotah", "North Carolina", "Montana", "Kentucky", "Louisiana", "Indiana", "North Dakota", "Wyoming", "Iowa", "Vermont", "Hawaii", "West Virginia"]

df = pd.read_csv('./states_spotted.csv')

df["license plate spotted"] = 0

for state in spotted_states:
    df.loc[df["state"] == state, 'license plate spotted'] = 1

df.to_csv('./states_spotted.csv', index=False)