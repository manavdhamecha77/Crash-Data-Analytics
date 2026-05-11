import pandas as pd

def get_summary_metrics(df):
    total_accidents = len(df)
    fatal_accidents = len(df[df['Severity'].str.contains('Fatal', case=False, na=False)])
    
    peak_district = df['District'].mode()[0] if 'District' in df.columns and not df['District'].empty else "N/A"
    peak_hour = f"{int(df['Hour'].mode()[0])}:00" if 'Hour' in df.columns and not df['Hour'].empty else "N/A"
    
    return {
        "total": total_accidents,
        "fatalities": fatal_accidents,
        "peakDistrict": peak_district,
        "peakHour": peak_hour
    }

def get_severity_distribution(df):
    if 'Severity' not in df.columns:
        return []
    dist = df['Severity'].value_counts().reset_index()
    dist.columns = ['severity', 'count']
    return dist.to_dict(orient='records')

def get_hourly_trend(df):
    if 'Hour' not in df.columns:
        return []
    trend = df.groupby('Hour').size().reset_index(name='count')
    # Fill missing hours
    all_hours = pd.DataFrame({'Hour': range(24)})
    trend = all_hours.merge(trend, on='Hour', how='left').fillna(0)
    trend['hour'] = trend['Hour'].apply(lambda x: f"{int(x):02d}:00")
    return trend[['hour', 'count']].to_dict(orient='records')
