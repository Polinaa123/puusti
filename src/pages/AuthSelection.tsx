import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import type { AuthSelectionProps } from '../types';

export default function AuthSelection({role}: AuthSelectionProps) {
    const navigate = useNavigate();
    const title = role === 'client' ? 'client' : 'freelancer';
    return (
        <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', paddingTop: '2rem'}}>
            <h2> {title}</h2>
            <div style ={{display: 'flex', gap: '1rem'}}>
                <Button onClick={() => navigate(`/register/${role}`, { state: { role} })}>register</Button>
                <Button onClick={() => navigate('/login', { state: { role } })}>login</Button>
            </div>
        </div>
    );
}