import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { uploadFile } from '../services/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SERVICE_OPTIONS = [
  'photography',
  'copywriting',
  'interior design',
  'social media marketing',
];
const ROOM_OPTIONS = ['1','2','3','4','5+','studio'];

type ListingType = 'rent' | 'sale';

export default function ListingRequestForm() {
  const navigate = useNavigate();

  // form state
  const [type, setType] = useState<ListingType>('rent');
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState(ROOM_OPTIONS[0]);
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [listingUrl, setListingUrl] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // toggle checkbox
  const toggleService = (s: string) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };
  // file input
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!auth.currentUser){
      setError('Please fill location and choose at least one service');
      return;
    }
    setError(null);
    try{
      const uid = auth.currentUser.uid;
      const photoUrls = await Promise.all(photos.map(f => uploadFile(uid, f)));
      await addDoc(collection(db, 'listings'), {
        type,
        location,
        rooms,
        size,
        description,
        listingUrl,
        services,
        budget,
        photoUrls,
        clientId: uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: 600, margin: 'auto' }}>
      <h2>new listing request</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>type of property</label>
      <select value={type} onChange={e => setType(e.target.value as ListingType)}>
        <option value="rent">rent</option>
        <option value="sale">sale</option>
      </select>

      <label>location</label>
      <input value={location} onChange={e => setLocation(e.target.value)} required />

      <label>number of rooms</label>
      <select value={rooms} onChange={e => setRooms(e.target.value)}>
        {ROOM_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <label>size (sqm)</label>
      <input type="number" value={size} onChange={e => setSize(e.target.value)} required />

      <label>current description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} required />

      <label>listing URL</label>
      <input type="url" value={listingUrl} onChange={e => setListingUrl(e.target.value)} />

      <fieldset>
        <legend>services required</legend>
        {SERVICE_OPTIONS.map(s => (
          <label key={s} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={services.includes(s)}
              onChange={() => toggleService(s)}
            />
            {s}
          </label>
        ))}
      </fieldset>

      <label>budget (eur)</label>
      <input type="number" value={budget} onChange={e => setBudget(e.target.value)} required />

      <label>upload photos</label>
      <input type="file" multiple onChange={handlePhotos} />

      <button type="submit" style={{ marginTop: '1rem' }}>submit</button>
    </form>
  );
}