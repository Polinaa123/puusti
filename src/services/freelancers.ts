import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from './firebase';
import { geocodeAddress } from './geoCode';

function haversineDistance(
    {lat: lat1, lng: lon1}: {lat: number, lng: number},
    {lat: lat2, lng: lon2}: {lat: number, lng: number}
): number {
    const toRad= (deg: number) => deg * (Math.PI / 180);
    const R= 6371;
    const dLat= toRad(lat2 - lat1);
    const dLon= toRad(lon2 - lon1);
    const a=
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c= 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export interface FreelancerProfile{
    uid: string;
    name: string;
    phone: string;
    coords: {lat: number, lng: number};
    hourlyRate: number;
    services: string[];
}

export async function fetchFreelancers(
    service: string,
    clientAddress: string,
    radiusKM: number
): Promise<(FreelancerProfile & {distance: number})[]> {
    const { lat, lng } = await geocodeAddress(clientAddress);
    const q= query(
        collection(db, 'freelancers'),
        where('services', 'array-contains', service)
    );
    const snap = await getDocs(q);

    const candidates: (FreelancerProfile & { distance: number })[] = [];
    snap.forEach(doc => {
        const f = doc.data() as FreelancerProfile;
        const distance = haversineDistance(
            { lat, lng },
            { lat: f.coords.lat, lng: f.coords.lng }
        );
        if (distance <= radiusKM) {
            candidates.push({ ...f, distance });
        }
    });
    return candidates.sort((a, b) => a.distance - b.distance);
}