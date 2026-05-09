import pandas as pd

DATA_PATH = "datasets/accident_data.xlsx"

def load_data():
    df = pd.read_excel(DATA_PATH)
    return df