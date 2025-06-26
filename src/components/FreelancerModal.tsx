import React from "react";
import { FreelancerProfile } from "../services/freelancers";
import ReactDOM from 'react-dom'

interface Props{
    profile: FreelancerProfile & { distance?: number };
    onClose: () => void;
}

export function FreelancerModal({profile, onClose}: Props){
    const links= Array.isArray(profile.portfolioLink)
        ? profile.portfolioLink
        : [profile.portfolioLink];
        
    return ReactDOM.createPortal(
        <>
            <div onClick={onClose} 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                }}
            />
            <div 
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    padding: 24,
                    borderRadius: 8,
                    maxWidth: 800,
                    width: '90vw',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    zIndex: 1001,
                }}
            >
                <button onClick={onClose}
                    style={{ 
                        position: 'absolute', 
                        top: 16, 
                        right: 16, 
                        fontSize: 18 }}>
                        close
                </button>

                <h2 style={{ marginBottom: 12 }}>{profile.name}</h2>
                <p><strong>email:</strong> {profile.email}</p>
                <p><strong>phone number:</strong> {profile.phone}</p>
                <p><strong>distance:</strong> {profile.distance} km</p>
                <p><strong>experience:</strong> {profile.experience}</p>
                <p><strong>hourly cost:</strong> {profile.hourlyRate} €/h</p>
                <p><strong>service:</strong> {profile.services.join(', ')}</p>
                <p style={{ margin: '12px 0' }}>{profile.description}</p>

                <h3>portfolio:</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
                    {links.map((url, i)=> (
                        <li key={i}>
                            <a href={url} target="_blank" rel="noreferrer">
                                {url}
                            </a>
                        </li>
                    ))}
                </ul>

                <h3>photo:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {profile.attachments?.map((url, i) => (
                        <img key={i} src={url} alt="attachment" style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                    ))}
                </div>
            </div>
        </>,
        document.body
    );
}