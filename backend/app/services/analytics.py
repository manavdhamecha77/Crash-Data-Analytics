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

def get_road_classification(df):
    if 'Road_Classification' not in df.columns:
        return []
    counts = df['Road_Classification'].value_counts().reset_index()
    counts.columns = ['type', 'count']
    return counts.to_dict(orient='records')

def get_collision_types(df):
    if 'Collision_Type' not in df.columns:
        return []
    counts = df['Collision_Type'].value_counts().reset_index()
    counts.columns = ['type', 'count']
    return counts.to_dict(orient='records')

def get_weather_conditions(df):
    if 'Weather_Condition' not in df.columns:
        return []
    counts = df['Weather_Condition'].value_counts().reset_index()
    counts.columns = ['condition', 'count']
    return counts.to_dict(orient='records')

def get_traffic_violations(df):
    if 'Traffic_Violation' not in df.columns:
        return []
    counts = df['Traffic_Violation'].value_counts().reset_index()
    counts.columns = ['violation', 'count']
    # Filter out 'Unknown' if it's too dominant, or keep it based on preference
    return counts.to_dict(orient='records')
