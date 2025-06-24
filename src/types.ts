export interface LocationState {
    name?: string;
    email?: string;
    role?: 'client' | 'freelancer';
  }

export interface AuthSelectionProps {
    role: 'client' | 'freelancer';
}

export interface Profile{
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  phone?: string;
  location?: string;
  services?: string[];
  hourlyRate?: string;
  experience?: string;
  portfolioLink?: string;
  attachments?: string[];
}

export interface Listing {
  id: string;
  type: string;
  location: string;
  rooms: string;
  size: number;
  description: string;
  listingUrl: string;
  services: string[];
  budget: number;
  photoUrls: string[];
  assignedFreelancer?: {
      uid: string;
      services: string[];
      name: string;
      email: string;
      phone?: string;
      hourlyRate?: string;
  };
  createdAt: { seconds: number };
}