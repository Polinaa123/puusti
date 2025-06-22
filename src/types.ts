export interface LocationState {
    name?: string;
    email?: string;
    role?: 'client' | 'freelancer';
  }

export interface AuthSelectionProps {
    role: 'client' | 'freelancer';
}