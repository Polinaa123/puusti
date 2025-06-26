import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import RegisterClient from '../pages/RegisterClient';
import RegisterFreelancer from '../pages/RegisterFreelancer';
import AuthSelection from '../pages/AuthSelection';
import Account from '../pages/Account';
import ProtectedRoute from '../components/ProtectedRoute';
import ListingRequestForm from '../pages/ListingRequestForm';
import RoleSelection from '../pages/RoleSelection';
import Dashboard from '../pages/Dashboard';
import FindFreelancer from '../pages/FindFreelancer';

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<RoleSelection />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/client" element={<RegisterClient />} />
      <Route path="/register/freelancer" element={<RegisterFreelancer />} />
      <Route path="/auth/client" element={<AuthSelection role = "client"/>} />
      <Route path="/auth/freelancer" element={<AuthSelection role = "freelancer"/>} />
      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      <Route path="/create-listing" element={<ProtectedRoute requiredRole='client'><ListingRequestForm/></ProtectedRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute requiredRole='client'><Dashboard /></ProtectedRoute>}/>
      <Route path="/find-freelancer/:listingId" element={<ProtectedRoute requiredRole='client'><FindFreelancer /></ProtectedRoute>}/>
    </Routes>
  );
}