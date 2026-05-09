# Crash Data Analytics Dashboard and Blackspot Identification

## G-TRISP Internship Task – Group A2

This project presents a crash data analytics and visualization pipeline developed for the G-TRISP internship evaluation task. The system analyzes road accident data to identify temporal trends, severity patterns, spatial distributions, and accident-prone blackspot regions using geospatial clustering techniques.

---

# Objective

The primary objective of this project is to:

- preprocess and clean crash data
- analyze accident trends and severity patterns
- visualize accident distribution geographically
- identify accident-prone hotspot regions
- perform DBSCAN-based clustering
- generate blackspot analysis outputs
- build a reproducible analytics workflow

---

# Dataset Description

The dataset contains accident-level records with attributes including:

- accident ID
- district and police station
- accident date and time
- latitude and longitude
- road classification
- severity
- vehicle involvement
- injury statistics
- weather conditions
- visibility conditions
- traffic violations

---

# Technologies Used

## Backend / Data Processing
- Python
- Pandas
- NumPy
- Scikit-learn

## Visualization
- Plotly
- Folium

## Spatial Analysis
- DBSCAN Clustering
- Heatmap Visualization

---

# Project Workflow

## 1. Data Loading
The dataset is loaded using Pandas for preprocessing and analysis.

---

## 2. Data Cleaning

The following preprocessing steps were performed:

- datetime conversion
- extraction of temporal features
- handling missing numerical values
- handling missing categorical values
- coordinate validation
- removal of invalid spatial entries where required

Additional temporal features extracted:
- Hour
- Month
- Year

---

## 3. Exploratory Data Analysis (EDA)

The following analyses were performed:

- severity distribution
- district-wise accident distribution
- hourly accident trends
- monthly accident trends
- weather condition analysis
- traffic violation analysis

---

## 4. Spatial Analysis

Geospatial visualization was performed using:
- accident point mapping
- density heatmaps
- coordinate-based spatial visualization

---

## 5. DBSCAN Clustering

DBSCAN (Density-Based Spatial Clustering of Applications with Noise) was used to identify accident hotspot regions based on geographic coordinates.

### Clustering Inputs
- Latitude
- Longitude

### Clustering Outputs
- cluster labels
- noise/outlier points
- hotspot regions

---

## 6. Blackspot Identification

Blackspots were identified by ranking accident clusters using:
- accident frequency
- fatality counts
- grievous injury counts

A severity score was computed for each cluster to identify high-risk regions.

---

# Spatial Data Limitation

During spatial analysis, several accident coordinates appeared uniformly distributed across the geographic region, including locations near coastal and non-road regions.

This suggests that the provided dataset may contain synthetic or randomized spatial coordinates intended for testing purposes.

As a result:
- DBSCAN clustering produced limited meaningful hotspot formation
- many points were classified as noise
- heatmap density appeared broadly uniform

The implemented spatial analysis pipeline remains fully functional and reproducible for real-world crash datasets containing realistic coordinate distributions.

---

# Output Files

The project generates:
- cleaned dataset
- visualizations
- heatmaps
- cluster analysis outputs
- blackspot summaries

---

# Folder Structure

```text
A2_Crash_Dashboard/
│
├── dataset/
│   └── accidents.xlsx
│
├── notebooks/
│   └── analysis.ipynb
│
├── outputs/
│   ├── plots/
│   ├── heatmaps/
│   ├── cluster_results.csv
│   └── blackspots.csv
│
├── README.md