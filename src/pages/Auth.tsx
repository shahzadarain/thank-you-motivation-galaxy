
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ACCESS_CODE = 'dag2025';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (code === ACCESS_CODE) {
        // Create anonymous session with Supabase
        const email = `anonymous${Date.now()}@example.com`;
        
        // First sign up the user
        const { error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: ACCESS_CODE,
        });

        if (signUpError) throw signUpError;

        // Then sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email,
          password: ACCESS_CODE,
        });

        if (signInError) throw signInError;

        // Set the authentication flag in sessionStorage
        sessionStorage.setItem('isAuthenticated', 'true');
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });

        // Navigate to home page after successful login
        navigate('/');
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
