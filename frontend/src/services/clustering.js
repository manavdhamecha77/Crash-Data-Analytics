/**
 * DBSCAN implementation in JavaScript
 * For spatial clustering of accident points.
 */

// Haversine distance in meters
function getDistance(p1, p2) {
  const R = 6371000; // Earth radius in meters
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLng = (p2.lng - p1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function runDBSCAN(points, eps, minSamples) {
  const n = points.length;
  const labels = new Array(n).fill(null); // null = unvisited, -1 = noise, 0+ = cluster ID
  let clusterId = 0;

  for (let i = 0; i < n; i++) {
    if (labels[i] !== null) continue;

    const neighbors = getNeighbors(points, i, eps);

    if (neighbors.length < minSamples) {
      labels[i] = -1; // Noise
    } else {
      expandCluster(points, i, neighbors, clusterId, eps, minSamples, labels);
      clusterId++;
    }
  }

  // Summarize clusters
  const clusters = [];
  for (let i = 0; i < clusterId; i++) {
    const clusterPoints = points.filter((_, idx) => labels[idx] === i);
    
    // Calculate metrics
    const latSum = clusterPoints.reduce((sum, p) => sum + p.lat, 0);
    const lngSum = clusterPoints.reduce((sum, p) => sum + p.lng, 0);
    const count = clusterPoints.length;
    
    const fatalities = clusterPoints.filter(p => 
      p.severity && p.severity.toLowerCase().includes('fatal')
    ).length;
    
    const grievous = clusterPoints.filter(p => 
      p.severity && p.severity.toLowerCase().includes('grievous')
    ).length;
    
    const minor = count - fatalities - grievous;
    const score = (fatalities * 5 + grievous * 3 + minor * 1) / count;

    clusters.push({
      id: i,
      location: `Cluster ${i} (${clusterPoints[0].district || 'Unknown'})`,
      accidents: count,
      fatalities: fatalities,
      score: parseFloat(score.toFixed(2)),
      lat: latSum / count,
      lng: lngSum / count,
      points: clusterPoints
    });
  }

  return {
    clusters: clusters.sort((a, b) => b.score - a.score),
    labels: labels
  };
}

function getNeighbors(points, pointIdx, eps) {
  const neighbors = [];
  for (let i = 0; i < points.length; i++) {
    if (getDistance(points[pointIdx], points[i]) <= eps) {
      neighbors.push(i);
    }
  }
  return neighbors;
}

function expandCluster(points, pointIdx, neighbors, clusterId, eps, minSamples, labels) {
  labels[pointIdx] = clusterId;
  let i = 0;
  while (i < neighbors.length) {
    const neighborIdx = neighbors[i];
    
    if (labels[neighborIdx] === -1) {
      labels[neighborIdx] = clusterId;
    } else if (labels[neighborIdx] === null) {
      labels[neighborIdx] = clusterId;
      const nextNeighbors = getNeighbors(points, neighborIdx, eps);
      if (nextNeighbors.length >= minSamples) {
        neighbors.push(...nextNeighbors.filter(idx => !neighbors.includes(idx)));
      }
    }
    i++;
  }
}
