
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Check if the code exists in the database
      const { data, error } = await supabase
        .from('access_codes')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error('Invalid access code');
      }

      // If we reach here, the code is valid
      sessionStorage.setItem('isAuthenticated', 'true');
      
      toast({
        title: "Success",
        description: "Access granted",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.error('Authentication error:', error);
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
