import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fetchFreelancers, FreelancerProfile } from '../services/freelancers';
import {FreelancerCard} from '../components/FreelancerCard';

export default function FindFreelancer() {
    const { listingId } = useParams<{ listingId: string }>();
    const [candidates, setCandidates] = useState<(FreelancerProfile & { distance: number })[]>([]);
    const [listing, setListing] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function load(){
            const docRef = doc(db, 'listings', listingId!);
            const docSnap= await getDoc(docRef);
            if (!docSnap.exists()) {
                console.error(`Listing ${listingId} not found`);
                return;
            }
            const data = docSnap.data()!;
            setListing(data);

            const list= await fetchFreelancers(data.services, data.location, 30);
            setCandidates(list);
        }
        load();
    }, [listingId]);

    const handleRequest = async (f: FreelancerProfile & { distance: number }) => {
        await addDoc(collection(db, 'bookings'), {
            listingId,
            clientId: auth.currentUser!.uid,
            freelancerId: f.uid,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        alert('request is sent to freelancer!');
        navigate('/dashboard');
    };

    if (!listing) return <p>loading...</p>;

    return(
        <div style={{ padding: 24, maxWidth: 800, margin: 'auto' }}>
            <h2>freelancers in "{listing.location}"</h2>
            {candidates.length === 0 ? (
                <p>no one is found nearby</p>
            ) : (
                candidates.map(f => (
                    <FreelancerCard
                        key={f.uid}
                        profile={f}
                        onSelect={() => handleRequest(f)}
                    />
                ))
            )}
        </div>
    );
}
