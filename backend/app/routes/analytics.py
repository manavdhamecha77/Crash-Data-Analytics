from fastapi import APIRouter, Depends
from app.services.loader import load_dataset
from app.services.preprocess import clean_data
from app.services import analytics

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
def read_districts(df=Depends(get_df)):
    if 'District' not in df.columns:
        return []
    dist = df['District'].value_counts().head(5).reset_index()
    dist.columns = ['district', 'count']
    return dist.to_dict(orient='records')
