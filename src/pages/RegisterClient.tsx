import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc, serverTimestamp} from "firebase/firestore";
import {auth, db} from "../services/firebase";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function RegisterClient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const cred= await createUserWithEmailAndPassword(auth, email, password);
            const uid= cred.user.uid;
            await setDoc(doc(db, 'users', uid), {
                name,
                email,
                role: 'client',
                createdAt: serverTimestamp(),
            });

            console.log('registered', cred.user.uid);

            const from = (location.state as any)?.from?.pathname || '/account';
            if (from === '/auth/client') {
            navigate('/client-form', { replace: true });
            } else {
            navigate(from, { replace: true });
            }
            } catch (err: any) {
                setError(err.message);
            }
    };
    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <label>name</label>
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
            />
            <label>email</label>
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
            <label>password</label>
            <input 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            <button type="submit">register</button>
        </form>
    );
}