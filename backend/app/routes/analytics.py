from fastapi import APIRouter, Depends, Query
from typing import Optional
from app.services.loader import load_dataset
from app.services.preprocess import clean_data
from app.services import analytics
from app.services import clustering

router = APIRouter()

# Global state to hold the dataset (loaded once)
_df = None

def get_df():
    global _df
    if _df is None:
        raw_df = load_dataset()
        _df = clean_data(raw_df)
    return _df

@router.get("/summary")
def read_summary(df=Depends(get_df)):
    return analytics.get_summary_metrics(df)

@router.get("/severity")
def read_severity(df=Depends(get_df)):
    return analytics.get_severity_distribution(df)

@router.get("/hourly")
def read_hourly(df=Depends(get_df)):
    return analytics.get_hourly_trend(df)

@router.get("/districts")
def read_districts(limit: Optional[int] = Query(5), df=Depends(get_df)):
    if 'District' not in df.columns:
        return []
    
    counts = df['District'].value_counts()
    if limit and limit > 0:
        dist = counts.head(limit).reset_index()
    else:
        dist = counts.reset_index()
        
    dist.columns = ['district', 'count']
    return dist.to_dict(orient='records')

@router.get("/points")
def read_points(df=Depends(get_df)):
    return clustering.get_heatmap_data(df)

@router.get("/blackspots")
def read_blackspots(df=Depends(get_df)):
    return clustering.identify_blackspots(df)

@router.get("/road-classification")
def read_road_class(df=Depends(get_df)):
    return analytics.get_road_classification(df)

@router.get("/collision-types")
def read_collision_types(df=Depends(get_df)):
    return analytics.get_collision_types(df)

@router.get("/weather")
def read_weather(df=Depends(get_df)):
    return analytics.get_weather_conditions(df)

@router.get("/traffic-violations")
def read_traffic_violations(df=Depends(get_df)):
    return analytics.get_traffic_violations(df)
