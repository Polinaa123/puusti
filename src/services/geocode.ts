/// <reference types="vite/client" />

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }>{
    const key= import.meta.env.VITE_GEOCODING_API_KEY;
    if (!key) {
        throw new Error("GEOCODING_API_KEY is not set");
    }
    const url= "https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Geocoding API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (data.status !== "OK") {
        throw new Error(`geocoding failed: ${data.status}`);
    }
    const {lat, lng} = data.results[0].geometry.location;
    return {lat, lng};
}