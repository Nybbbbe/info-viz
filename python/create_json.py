import pandas as pd

# Read the CSV file into a pandas DataFrame
file_path = './python/global_power_plant_database.csv'  # Replace this with the actual file path
data = pd.read_csv(file_path)

# List the column headers
column_headers = data.columns.tolist()
print("Column Headers:", column_headers)

# List of columns you want to select
desired_columns = ['country_long', 'name', 'capacity_mw', 'latitude', 'longitude', 'primary_fuel', 'commissioning_year']  # Replace these with your actual column names

# Create a new DataFrame with the desired columns
new_df = data[desired_columns]

print(new_df.head(10))

output_json_path = './python/power_plant_database.json'  # Replace this with the desired output file path
new_df.to_json(output_json_path, indent=4, orient='records')