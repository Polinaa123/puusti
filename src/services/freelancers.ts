import {collection, getDocs, query, where, getFirestore} from 'firebase/firestore';
import {db, app} from './firebase';
import {geocodeAddress, LatLng} from './geoCode';

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
    email: string;
    phone: string;
    coords: LatLng;
    services: string[];
    description: string;
    experience: 'junior'|'mid'|'senior';
    hourlyRate: number;
    portfolioLink: string[];
    attachments: string[];
}

export async function fetchFreelancers(
    services: string[],
    clientAddress: string,
    radiusKM: number
): Promise<(FreelancerProfile & {distance: number})[]> {
    const clientCoords = await geocodeAddress(clientAddress);
    const db = getFirestore(app);
    const q= query(collection(db, 'users'), where('role', '==', 'freelancer'), where('services', 'array-contains-any', services));
    const snap = await getDocs(q);
    const candidates: (FreelancerProfile & { distance: number })[] = [];

    snap.forEach(doc => {
        const fData = doc.data() as any
        const f: FreelancerProfile = {
            uid: doc.id,
            name: fData.name,
            email: fData.email,
            phone: fData.phone,
            coords: fData.coords,
            services: fData.services,
            description: fData.description,
            experience: fData.experience,
            hourlyRate: Number(fData.hourlyRate),
            portfolioLink: fData.portfolioLink || '',
            attachments: fData.attachments || []
        };

        const distance = haversineDistance(clientCoords, f.coords);

        if (distance <= radiusKM) {
            candidates.push({...f, distance});
        }
    });
    return candidates;
}