from sklearn.cluster import DBSCAN
import numpy as np
import pandas as pd

def identify_blackspots(df, eps_km=0.1, min_samples=3):
    """
    Identifies accident blackspots using DBSCAN clustering.
    eps_km: maximum distance in km between two samples to be considered in the same cluster.
    """
    if df.empty or 'Latitude' not in df.columns or 'Longitude' not in df.columns:
        return []

    # Radius of Earth in km
    kms_per_radian = 6371.0088
    epsilon = eps_km / kms_per_radian

    # Filter out invalid coordinates
    valid_df = df.dropna(subset=['Latitude', 'Longitude'])
    if valid_df.empty:
        return []

    coords = valid_df[['Latitude', 'Longitude']].values
    
    # DBSCAN 
    db = DBSCAN(eps=epsilon, min_samples=min_samples, algorithm='ball_tree', metric='haversine').fit(np.radians(coords))
    
    valid_df = valid_df.copy()
    valid_df['Cluster'] = db.labels_
    
    # Filter out noise (label -1)
    clusters = valid_df[valid_df['Cluster'] != -1]
    
    if clusters.empty:
        return []

    # Summarize clusters
    blackspots = []
    for cluster_id, group in clusters.groupby('Cluster'):
        # Calculate severity score: Fatal*5 + Grievous*3 + Minor*1
        # Match severity strings from dataset if possible, or use heuristic
        fatal = len(group[group['Severity'].str.contains('Fatal', case=False, na=False)])
        grievous = len(group[group['Severity'].str.contains('Grievous', case=False, na=False)])
        minor = len(group) - fatal - grievous
        
        score = (fatal * 5) + (grievous * 3) + (minor * 1)
        
        blackspots.append({
            "id": int(cluster_id),
            "location": f"Cluster {cluster_id} ({group['District'].iloc[0]})",
            "accidents": len(group),
            "fatalities": fatal,
            "score": round(score / len(group), 2),
            "lat": group['Latitude'].mean(),
            "lng": group['Longitude'].mean()
        })
    
    # Sort by score descending
    blackspots.sort(key=lambda x: x['score'], reverse=True)
    return blackspots

def get_heatmap_data(df):
    """
    Returns points for heatmap and frontend clustering.
    """
    if df.empty or 'Latitude' not in df.columns or 'Longitude' not in df.columns:
        return []
        
    cols = ['Latitude', 'Longitude', 'Severity', 'District']
    available_cols = [c for c in cols if c in df.columns]
    
    points = df[available_cols].copy()
    points.rename(columns={'Latitude': 'lat', 'Longitude': 'lng', 'Severity': 'severity', 'District': 'district'}, inplace=True)
    points['weight'] = 1.0
    return points.to_dict(orient='records')
