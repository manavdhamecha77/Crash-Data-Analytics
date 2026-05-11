import pandas as pd
import os

def load_dataset():
    """
    Loads the accident dataset from the Excel file.
    """
    # Dataset path relative to backend/app/services/loader.py
    # Project structure shows datasets/accident_data.xlsx at the root.
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    file_path = os.path.join(base_dir, 'datasets', 'accident_data.xlsx')

    if not os.path.exists(file_path):
        # Try local backend folder if root doesn't work
        file_path = '/home/manav/My-Space/G-TRISP/A2/datasets/accident_data.xlsx'

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset not found at {file_path}")
    
    df = pd.read_excel(file_path)
    return df
