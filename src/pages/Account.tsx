import React, { useEffect, useState } from 'react';
import { doc, getDoc} from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import PhotoGallery from '../components/PhotoGallery';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Profile, Listing } from '../types';

export default function Account() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const {user, loading: authLoading} = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [modalProfile, setModalProfile]= useState<Profile | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            setError('no user is logged in');
            setLoading(false);
            return;
        }
        (async() => {
            try {
                const docSnap = await getDoc(doc(db, 'users', uid));
                if (docSnap.exists()) {
                    setProfile(docSnap.data() as Profile);
                } else setError('no profile found');
                } catch (e: any){
                    setError(e.message);
                } finally {
                    setLoading(false);
                }
        })();
    }, [user]);

    async function openFreelancerModal(uid: string) {
        const snap= await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
            setModalProfile(snap.data() as Profile);
            setShowModal(true);
        }
    }

    if (authLoading || loading) return <p>loading profile…</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!profile) return <p>no profile data</p>;

    return (
        <div style={{ padding: '2rem' }}>
          <h2>account details</h2>
          <p><strong>role:</strong> {profile.role}</p>
          <p><strong>name:</strong> {profile.name}</p>
          <p><strong>email:</strong> {profile.email}</p>
    
            {profile.role === 'freelancer' && (
            <>
                <p><strong>phone:</strong> {profile.phone}</p>
                <p><strong>location:</strong> {profile.location}</p>
                <p><strong>services:</strong> {profile.services?.join(', ')}</p>
                <p><strong>hourly rate:</strong> €{profile.hourlyRate}</p>
                <p><strong>experience:</strong> {profile.experience}</p>
                <p>
                    <strong>portfolio:</strong>{' '}
                    <a href={profile.portfolioLink} target="_blank" rel="noopener noreferrer">
                    {profile.portfolioLink}
                    </a>
                </p>
                {profile.attachments && profile.attachments.length > 0 && (
                    <div>
                        <h3>your attachments</h3>
                        <PhotoGallery photos={profile.attachments} columns={4} />
                    </div>
                    )}
                </>
            )}
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button onClick={handleLogout}>logout</button>
                <button onClick={() => navigate('/dashboard')}>
                    listings dashboard
                </button>
            </div>
        </div>
    )
}