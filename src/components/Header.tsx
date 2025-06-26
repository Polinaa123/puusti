import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  padding: '0.5rem 1rem',
  borderRadius: 4,
};

const activeLinkStyle: React.CSSProperties = {
  backgroundColor: '#e0e0e0',
};

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #ddd',
        padding: '0.5rem 1rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive
            ? { ...linkStyle, ...activeLinkStyle }
            : linkStyle
        }
      >
        home
      </NavLink>

      <NavLink
        to="/auth/freelancer"
        style={({ isActive }) =>
          isActive
            ? { ...linkStyle, ...activeLinkStyle }
            : linkStyle
        }
      >
        i am a freelancer
      </NavLink>

      <NavLink
        to="/account"
        style={({ isActive }) =>
          isActive
            ? { ...linkStyle, ...activeLinkStyle }
            : linkStyle
        }
      >
        account
      </NavLink>

      <NavLink
        to="/dashboard"
        style={({ isActive }) =>
          isActive
            ? { ...linkStyle, ...activeLinkStyle }
            : linkStyle
        }
      >
        dashboard
      </NavLink>
    </header>
  );
}
