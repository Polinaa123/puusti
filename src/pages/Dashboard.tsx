import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Listing {
    id: string;
    type: string;
    location: string;
    budget: number;
    createdAt: { seconds: number };
}

export default function Dashboard() {
    const [listings, setListings] = useState<Listing[]>([]);
    const navigate = useNavigate();

    useEffect(() =>{
        if (!auth.currentUser) return;
        async function load() {
            const q = query(
                collection(db, 'listings'),
                where('clientId', '==', auth.currentUser!.uid)
            );
            const snap = await getDocs(q);
            setListings(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
        }
        load();
    }, []);

    return(
        <div style={{ padding: 24, maxWidth: 800, margin: 'auto' }}>
            <h2>my listings</h2>
            {listings.length === 0 && <p>you don't have listings</p>}
            {listings.map(l => (
                <div 
                    key={l.id}
                    style = {{
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 12,}}
                >
                    <p><strong>{l.type.toUpperCase()}</strong> — {l.location}</p>
                    <p>budget: €{l.budget}</p>
                    <p>date: {new Date(l.createdAt.seconds * 1000).toLocaleDateString()}</p>
                    <button
                        onClick={() => navigate(`/find-freelancer/${l.id}`)}
                        style={{ marginTop: 8 }}>
                            find a freelancer
                        </button>
                </div>
            ))}
        </div>
    );
}