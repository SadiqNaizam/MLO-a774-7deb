import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthPageLayout from '@/components/layout/AuthPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  console.log('ForgotPasswordPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    console.log('Forgot password request for:', email);
    // Simulate API call
    if (email) {
      setMessage({ type: 'success', text: 'If an account with this email exists, a password reset link has been sent.' });
      console.log('Password reset link sent (simulated)');
    } else {
      setMessage({ type: 'error', text: 'Please enter your email address.' });
    }
  };

  return (
    <AuthPageLayout title="Forgot Your Password?">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address below and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'bg-green-50 border-green-300 text-green-700' : ''}>
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{message.type === 'success' ? 'Email Sent' : 'Error'}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            {!message?.text.startsWith("If an account") && (
                 <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                 </div>
            )}
            
            {!message?.text.startsWith("If an account") && (
                <div>
                <Button type="submit" className="w-full">
                    Send Reset Link
                </Button>
                </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;