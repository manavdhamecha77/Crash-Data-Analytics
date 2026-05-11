import pandas as pd

def clean_data(df):
    """
    Cleans and preprocesses the accident dataframe.
    """
    # 1. Datetime conversion
    if 'Accident_DateTime' in df.columns:
        df['Accident_DateTime'] = pd.to_datetime(
            df['Accident_DateTime'],
            dayfirst=True,
            errors='coerce'
        )
        
        # 2. Extract temporal features
        df['Year'] = df['Accident_DateTime'].dt.year
        df['Month'] = df['Accident_DateTime'].dt.month
        df['Hour'] = df['Accident_DateTime'].dt.hour
    
    # 3. Handle missing values
    # Coordinates are essential for spatial analysis
    df = df.dropna(subset=['Latitude', 'Longitude'])
    
    # 4. Fill other missing values
    # For numerical columns, fill with 0
    numerical_cols = df.select_dtypes(include=['number']).columns
    df[numerical_cols] = df[numerical_cols].fillna(0)
    
    # For categorical columns, fill with 'Unknown'
    categorical_cols = df.select_dtypes(include=['object']).columns
    df[categorical_cols] = df[categorical_cols].fillna('Unknown')
    
    return df
