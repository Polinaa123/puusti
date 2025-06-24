import React from "react";
import { FreelancerProfile } from "../services/freelancers";

interface Props{
    profile: FreelancerProfile & { distance: number };
    onSelect: (profile: FreelancerProfile & { distance: number }) => void;
}

export function  FreelancerCard({profile, onSelect}: Props) {
    return(
        <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-700 mb-1">service: {profile.services[0]}</p>
            <p className="text-gray-600 mb-1">distance: {profile.distance.toFixed(1)} km</p>
            <p className="text-gray-600 text-sm mb-2">description: {profile.description}</p>
            <button
                className="text-blue-600 hover:underline"
                onClick={() => onSelect(profile)}
            >
                details
            </button>
        </div>
    );
}