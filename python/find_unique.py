import pandas as pd

# Read the CSV file into a pandas DataFrame
file_path = './python/global_power_plant_database.csv'  # Replace this with the actual file path
data = pd.read_csv(file_path)

# List the column headers
column_headers = data.columns.tolist()
print("Column Headers:", column_headers)

df_primary_fuel = data['primary_fuel']

print(df_primary_fuel.unique())