
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ACCESS_CODE = 'dag2025';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (code === ACCESS_CODE) {
        // Set the authentication flag in sessionStorage
        sessionStorage.setItem('isAuthenticated', 'true');
        
        navigate('/');
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        throw new Error('Invalid access code');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter access code
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your access code"
              className="mt-1"
              autoFocus
            />
          </div>

          <div>
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
