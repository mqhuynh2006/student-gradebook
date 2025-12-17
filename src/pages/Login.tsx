import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GraduationCap, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(studentId, passcode);
    
    if (result.success) {
      navigate('/transcript');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-gold" />
            </div>
            <CardTitle className="text-2xl font-serif text-navy">
              Student Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to view your transcript
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-foreground font-medium">
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  disabled={isLoading}
                  className="focus:ring-gold"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passcode" className="text-foreground font-medium">
                  Passcode
                </Label>
                <Input
                  id="passcode"
                  type="password"
                  placeholder="Enter your Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  disabled={isLoading}
                  className="focus:ring-gold"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md animate-fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                variant="navy"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-primary-foreground/60 text-sm mt-6">
          Virtual Bible Training School
        </p>
      </div>
    </div>
  );
};

export default Login;