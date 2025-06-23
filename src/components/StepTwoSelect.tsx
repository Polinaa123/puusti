import React from 'react';
import Button from './Button';

export interface FreelancerProfile {
    uid: string;
    name: string;
    phone: string;
    coords: { lat: number; lng: number };
    hourlyRate: number;
    services: string[];
    distance: number;
}
interface StepTwoSelectProps {
    candidates: FreelancerProfile[];
    onSelect: (freelancer: FreelancerProfile) => void;
    onBack: () => void;
}
export default function StepTwoSelect({ candidates, onSelect, onBack}: StepTwoSelectProps){
    return(
        <div style={{ padding: '1rem', maxWidth: 600, margin: 'auto' }}>
            <h2>Select a Professional</h2>
            <button onClick={onBack} style={{ marginBottom: '1rem' }}>
                back
            </button>
            {candidates.length === 0 ? (
                <p>no professionals found in your area</p>
            ) : (
                candidates.map(fr => (
                    <div
                        key={fr.uid}
                        style={{
                        border: '1px solid #ddd',
                        borderRadius: 4,
                        padding: '1rem',
                        marginBottom: '1rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    >
                        <p><strong>{fr.name}</strong> – {fr.distance.toFixed(1)} km away</p>
                        <p>phone: {fr.phone}</p>
                        <p>rate: €{fr.hourlyRate}/h</p>
                        <button onClick={() => onSelect(fr)} style={{ marginTop: '0.5rem' }}>
                            select
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}