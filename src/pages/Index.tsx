import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Login from './Login';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { student, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && student) {
      navigate('/transcript');
    }
  }, [student, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return <Login />;
};

export default Index;