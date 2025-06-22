import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function RoleSelection() {
  const nav = useNavigate();
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Who are you?</h2>
      <button onClick={() => nav('/auth/client')}>I am a client</button>
      <button onClick={() => nav('/auth/freelancer')} style={{ marginLeft: 10 }}>
        I am a freelancer
      </button>
    </div>
  );
}