import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { uploadFile } from '../services/storage';
import { geocodeAddress } from '../services/geoCode';

const SERVICE_OPTIONS = [
    'photography',
    'interior design',
    'copywriting',
];

export default function RegisterFreelancer() {
    const navigate= useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [services, setServices] = useState<string[]>([]);
    const [hourlyRate, setHourlyRate] = useState('');
    const [experience, setExperience] = useState<'junior' | 'mid' | 'senior'>('junior');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const [error, setError] = useState<string |null>(null);

    const toggleService = (service: string) => {
        setServices((prev) => 
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const handleFiles= (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            const uid = cred.user.uid;
            const {lat, lng} = await geocodeAddress(location);
            const urls = await Promise.all(
                attachments.map(file => uploadFile(uid, file))
            );

            await setDoc(doc(db, 'users', uid), {
                name,
                email,
                phone,
                location,
                coords: {lat, lng},
                services,
                hourlyRate,
                experience,
                portfolioLink,
                attachments: urls,
                role: 'freelancer',
                createdAt: serverTimestamp(),
            });

            navigate('/account');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: 600 }}>
            <h2>register as a freelancer</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>full name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

            <label>email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

            <label>password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

            <label>phone:</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

            <label>location (city, country):</label>
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

            <fieldset>
                <legend>service you provide:</legend>
                {SERVICE_OPTIONS.map(service => (
                    <label key={service} style={{ display: 'block' }}>
                        <input
                            type="checkbox"
                            checked={services.includes(service)}
                            onChange={() => toggleService(service)}
                        />
                        {service}
                    </label>
                ))}
            </fieldset>

            <label>hourly rate (eur):</label>
                <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    required
                />

            <fieldset>
                <legend>experience level:</legend>
                <label>
                    <input
                        type="radio"
                        name="experience"
                        value="junior"
                        checked={experience === 'junior'}
                        onChange={() => setExperience('junior')}
                    />
                    junior
                </label>
                <label>
                    <input
                        type="radio"
                        name="experience"
                        value="mid"
                        checked={experience === 'mid'}
                        onChange={() => setExperience('mid')}
                    />
                    Mid‐level
                </label>
                <label>
                    <input
                        type="radio"
                        name="experience"
                        value="senior"
                        checked={experience === 'senior'}
                        onChange={() => setExperience('senior')}
                    />
                    Senior
                </label>
            </fieldset>

            <label>portfolio link:</label>
                <input
                    value={portfolioLink}
                    onChange={e => setPortfolioLink(e.target.value)}
                />

            <label>attach files/ photos:</label>
                <input 
                    type ="file" 
                    multiple 
                    onChange ={handleFiles}
                />

            <button type="submit"style={{ marginTop: '1rem' }}>
                register
            </button>
        </form>
    );
}
