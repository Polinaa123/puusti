import React from "react";
import { FreelancerProfile } from "../services/freelancers";

interface Props{
    profile: FreelancerProfile & { distance?: number };
    onClose: () => void;
}

export function FreelancerModal({profile, onClose}: Props){
    const links= Array.isArray(profile.portfolioLink)
        ? profile.portfolioLink
        : [profile.portfolioLink];
        
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>close</button>
                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                <p><strong>email:</strong> {profile.email}</p>
                <p><strong>phone number:</strong> {profile.phone}</p>
                <p><strong>distance:</strong> {profile.distance} km</p>
                <p><strong>experience:</strong> {profile.experience}</p>
                <p><strong>hourly cost:</strong> {profile.hourlyRate} €/h</p>
                <p><strong>service:</strong> {profile.services.join(', ')}</p>
                <p className="mt-2 mb-4">{profile.description}</p>
                <h3 className="font-semibold mb-2">portfolio:</h3>
                <ul className="list-disc pl-5 mb-4">
                    {links.map((url, idx)=> (
                        <li key={idx}>
                            <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                {url}
                            </a>
                        </li>
                    ))}
                </ul>
                <h3 className="font-semibold mb-2">photo:</h3>
                <div className="grid grid-cols-3 gap-2">
                    {profile.attachments?.map((url, idx) => (
                        <img key={idx} src={url} alt="Attachment" className="object-cover h-24 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}