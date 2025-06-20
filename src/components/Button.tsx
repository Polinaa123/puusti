import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
            }}
        >
            {children}
        </button>
    );
}