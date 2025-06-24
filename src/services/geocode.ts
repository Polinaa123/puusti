/// <reference types="vite/client" />

export interface LatLng {
  lat: number;
  lng: number;
}

export async function geocodeAddress(address: string): Promise<LatLng> {
  if (!address.trim()) {
    throw new Error("Empty address");
  }

  const key = import.meta.env.VITE_GEOCODING_API_KEY;
  const url =
    `https://maps.googleapis.com/maps/api/geocode/json`
    + `?address=${encodeURIComponent(address)}`
    + `&components=country:FI|country:LV`
    + `&key=${encodeURIComponent(key)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Network error: ${res.status}`);
  }

  const json = await res.json() as {
    status: string;
    results?: Array<{ geometry: { location: LatLng } }>;
    error_message?: string;
  };

  if (json.status !== "OK" || !json.results?.length) {
    const message = json.error_message || json.status;
    throw new Error(`Geocoding failed: ${message}`);
  }

  return json.results[0].geometry.location;
}