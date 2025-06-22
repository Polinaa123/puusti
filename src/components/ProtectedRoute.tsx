import React, { JSX, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

interface ProtectedRouteProps {
  requiredRole?: 'client' | 'freelancer';
  children: JSX.Element;
}

export default function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          setProfile(snap.data());
        }
        setLoading(false);
      })();
    }, [user]);

  if (authLoading || loading) {
    return <p>loading…</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location }}
        replace
      />
    );
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <Navigate
        to="/auth/client"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
