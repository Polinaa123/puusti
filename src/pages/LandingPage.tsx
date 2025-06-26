import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style ={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
        <Button onClick={() => {
          if (user) {
            navigate('/create-listing');
          } else {
            navigate('/auth/client');
          }
        }}>
          i want to improve my listing
        </Button>
      </div>
    </div>
  );
}