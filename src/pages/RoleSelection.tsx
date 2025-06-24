import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function RoleSelection() {
  const nav = useNavigate();
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>who are you?</h2>
      <Button onClick={() => nav('/auth/client')}>I am a client</Button>
      <Button onClick={() => nav('/auth/freelancer')}>
        i am a freelancer
      </Button>
    </div>
  );
}