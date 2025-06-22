import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import type {LocationState} from '../types';

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = useLocation() as { state: LocationState };
    const role = state?.role ?? 'client';
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit= (e: React.FormEvent) => {
        e.preventDefault();
        console.log('register as', {role, name, email});
        navigate('/account', { state: { role, name, email } });
    };

    return(
        <div style={{padding: '2rem'}}>
            <h2>register as {role}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>name:</label>
                    <input type="text" 
                    value ={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
                </div>
                <div>
                    <label>email:</label>
                    <input type="email" 
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div>
                    <label>password:</label>
                    <input type="password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    required /> 
                </div>
                <button type="submit">register</button>
            </form>
        </div>
    );
}