import pandas as pd

df = pd.read_excel("datasets/accident_data.xlsx")

print(df.head())
print(df.info())