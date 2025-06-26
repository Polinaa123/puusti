import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import type {LocationState} from '../types';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = useLocation() as { state: LocationState };
    const role = state?.role ?? 'client';
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit= async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const cred = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', cred.user.uid);
            const from = (location.state as any)?.from?.pathname || '/account';
            if (from === '/auth/client') {
                navigate('/create-listing', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        }catch (err: any) {
            console.error(err);
        };

    console.log('Current user:', auth.currentUser);
    };

    return(
        <div style={{padding: '2rem'}}>
            <h2>login as {role}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email:</label>
                    <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div>
                    <label>password:</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    required /> 
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
}