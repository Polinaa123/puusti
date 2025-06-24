import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from './firebase';
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
    hourlyRate: number;
    services: string[];
}

export async function fetchFreelancers(
    services: string[],
    clientAddress: string,
    radiusKM: number
): Promise<(FreelancerProfile & {distance: number})[]> {
    const clientCoords = await geocodeAddress(clientAddress);
    const q= query(collection(db, 'freelancers'), where('role', '==', 'freelancer'), where('services', 'array-contains-any', services));
    const snap = await getDocs(q);
    const candidates: (FreelancerProfile & { distance: number })[] = [];
    snap.forEach(doc => {

        const fData = doc.data() as Omit<FreelancerProfile, 'uid'>;
        const distance = haversineDistance(clientCoords, fData.coords);

        console.log('▶ Проверяем фрилансера:', doc.id);
        console.log('   services:', fData.services);
        console.log('   coords:', fData.coords, ' vs clientCoords:', clientCoords);

        console.log('   расстояние (км):', distance.toFixed(1), 'макс:', radiusKM);
        if (distance <= radiusKM) {
            candidates.push({uid: doc.id, ...fData, distance });
            console.log('   ↳ пропускаем — далее радиуса');
            return;
        }
        console.log('   ✅ добавляем в кандидаты');
        candidates.push({ uid: doc.id, ...fData, distance });
    });
    console.log('🏁 Всего кандидатов:', candidates.length, candidates);
    return candidates.sort((a, b) => a.distance - b.distance);
}