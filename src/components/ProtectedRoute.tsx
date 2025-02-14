import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}