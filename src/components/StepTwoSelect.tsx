import React from 'react';
import type { FreelancerProfile } from '../services/freelancers';

interface StepTwoSelectProps {
    candidates: Array<FreelancerProfile & {distance: number}>;
    onSelect: (freelancer: FreelancerProfile & { distance: number }) => void | Promise<void>;
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
                candidates.map(f => (
                    <div
                        key={f.uid}
                        style={{
                        border: '1px solid #ddd',
                        borderRadius: 4,
                        padding: '1rem',
                        marginBottom: '1rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    >
                        <p><strong>{f.name}</strong> – {f.distance.toFixed(1)} km away</p>
                        <p>phone: {f.phone}</p>
                        <p>rate: €{f.hourlyRate}/h</p>
                        <button onClick={() => onSelect(f)} style={{ marginTop: '0.5rem' }}>
                            select
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}