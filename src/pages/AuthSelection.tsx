import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function AuthSelection(){
    const navigate = useNavigate();
    return (
        <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', paddingTop: '2rem'}}>
            <h2> are you a customer or freelancer?</h2>
            <div>
                <Button onClick={() => navigate('/register', { state: { role: 'client' } })}>customer</Button>
                <Button onClick={() => navigate('/register', { state: { role: 'freelancer' } })}>freelancer</Button>
            </div>
            <div>
                <Button onClick={() => navigate('/login', { state: { role: 'client' } })}>login as a customer</Button>
                <Button onClick={() => navigate('/login', { state: { role: 'freelancer' } })}>login as a freelancer</Button>
            </div>
        </div>
    );
}