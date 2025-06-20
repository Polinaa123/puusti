import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style ={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <Button onClick={() => navigate('/auth/select')}>
          i want to improve my listing
        </Button>
    </div>
  );
}