import pandas as pd

def clean_data(df):
    """
    Cleans and preprocesses the accident dataframe.
    """
    # 1. Datetime conversion
    # Assuming columns 'Date' and 'Time' exist or similar. 
    # Adjust based on actual dataset inspection if needed.
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    
    # 2. Extract temporal features
    if 'Date' in df.columns:
        df['Year'] = df['Date'].dt.year
        df['Month'] = df['Date'].dt.month
        df['Hour'] = pd.to_datetime(df['Time'], format='%H:%M:%S', errors='coerce').dt.hour if 'Time' in df.columns else 0

    # 3. Handle missing values
    df = df.dropna(subset=['Latitude', 'Longitude']) # Critical for spatial analysis
    
    # 4. Fill other categorical missing values
    df = df.fillna('Unknown')
    
    return df
