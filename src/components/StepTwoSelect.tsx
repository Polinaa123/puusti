import React, {useState} from 'react';
import type { FreelancerProfile } from '../services/freelancers';
import {FreelancerCard} from './FreelancerCard';
import {FreelancerModal} from './FreelancerModal';

interface StepTwoSelectProps {
    candidates: Array<FreelancerProfile & {distance: number}>;
    onSelect: (freelancer: FreelancerProfile & { distance: number }) => void | Promise<void>;
    onBack: () => void;
}
export default function StepTwoSelect({ candidates, onSelect, onBack}: StepTwoSelectProps){
    const [selected, setSelected] = useState<(FreelancerProfile & { distance: number }) | null>(null);
    
    return(
        <div style={{ padding: '1rem', maxWidth: 600, margin: 'auto' }}>
            <h2>select a professional</h2>
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                back
            </button>
            {candidates.length === 0 ? (
                <p>no professionals found in your area</p>
            ) : (
                candidates.map((f)=> (
                    <FreelancerCard
                        key={f.uid}
                        profile={f}
                        onSelect={(prof) => setSelected(prof)}
                    />
                ))
            )}
            
            {selected && (
                <FreelancerModal
                    profile={selected}
                    onClose={()=> setSelected(null)}
                />
            )}
        </div>
    );
}