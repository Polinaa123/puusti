import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
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
    const [listings, setListings] = useState<Listing[]>([]);
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
                } else {
                    setError('no profile found');
                }
                const colRef = collection(db, 'users', uid, 'listings');
                const snapShot = await getDocs(colRef);
                const items: Listing[] = snapShot.docs.map(d=> ({ id: d.id, ...(d.data() as any)}));
                setListings(items);
            } catch (e: any) {
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
            {profile.role === 'client' && (
                <>
                    <h3 style={{ marginTop: '2rem' }}>your listings</h3>
                    {listings.length === 0 && <p>no listings yet</p>}
                    {listings.map(listing => (
                        <div key={listing.id} style={{ border: '1px solid #ccc', padding: 12, borderRadius: 4, marginTop: 12 }}>
                            <p><strong>type:</strong> {listing.type}</p>
                            <p><strong>location:</strong> {listing.location}</p>
                            <p><strong>rooms:</strong> {listing.rooms}</p>
                            <p><strong>size:</strong> {listing.size} sqm</p>
                            <p><strong>description:</strong> {listing.description}</p>
                        {listing.listingUrl && (
                            <p>
                                <strong>URL:</strong> 
                                <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                            </p>
                        )}
                        <p><strong>services:</strong> {listing.services.join(', ')}</p>
                        <p><strong>budget:</strong> €{listing.budget}</p>
                        {listing.photoUrls.length > 0 && (
                            <PhotoGallery photos={listing.photoUrls} columns={3} />
                        )}
                        {listing.assignedFreelancer && (
                            <div style={{ marginTop: 8}}>
                                <p>
                                    <strong>assigned freelancer:</strong>{' '}
                                    {listing.assignedFreelancer.name}{' '}(
                                    {listing.assignedFreelancer.hourlyRate
                                    ? `€${listing.assignedFreelancer.hourlyRate}/h`
                                    : 'rate n/a'}
                                    )
                                </p>
                                <button onClick={() => openFreelancerModal(listing.assignedFreelancer!.uid)}>
                                    view freelancers details
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {showModal && modalProfile && (
                    <>
                        <div onClick={() => setShowModal(false)}
                            style={{ 
                                position: 'fixed', 
                                top: 0, 
                                left: 0, 
                                width: "100vw", 
                                height: "100vh", 
                                backgroundColor: 'rgba(0,0,0,0.5)', 
                                zIndex: 1000 }} />
                        
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
                                zIndex: 1001,}}>

                            <button onClick={() => setShowModal(false)} style={{ float: 'right' }}>
                                close
                            </button>
                            <h2>{modalProfile.name}</h2>
                            <p><strong>Services:</strong> {modalProfile.services?.join(', ')}</p>
                            <p><strong>Experience:</strong> {modalProfile.experience}</p>
                            <p><strong>Location:</strong> {modalProfile.location}</p>
                            <p><strong>Phone:</strong> {modalProfile.phone}</p>
                            <p><strong>Email:</strong> {modalProfile.email}</p>
                            {modalProfile.portfolioLink && (
                                <p>
                                    <strong>Portfolio:</strong>{' '}
                                    <a href={modalProfile.portfolioLink} target="_blank" rel="norefferer">
                                        {modalProfile.portfolioLink}
                                    </a>
                                </p>
                            )}
                            {modalProfile.attachments && modalProfile.attachments.length! > 0 && (
                                <>
                                    <h3>attachments</h3>
                                    <PhotoGallery photos={modalProfile.attachments} columns={4} />
                                </>
                            )}
                        </div>
                    </>
                )}
            </>
            )}
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button onClick={handleLogout}>logout</button>
                <button onClick={() => navigate('/client-form')}>
                    puust the listing
                </button>
            </div>
        </div>
    )
}