import { GeoCoordinates } from "../globe/geoCoordinates.interface";

export async function getDistanceBetween(from: GeoCoordinates, to: GeoCoordinates) {
  const response = await fetch('/api/distance-between', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({from, to})
  });

  return await response.json();
}