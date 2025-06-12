import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthPageLayout from '@/components/layout/AuthPageLayout';
import PasswordField from '@/components/PasswordField';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();
  // In a real app, you'd get a token from the URL query parameters
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');

  console.log('ResetPasswordPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (newPassword !== confirmNewPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }
    console.log('Reset password attempt with new password.');
    // Simulate API call to reset password with token
    // if (!token) {
    //   setMessage({ type: 'error', text: 'Invalid or expired reset token.' });
    //   return;
    // }

    setMessage({ type: 'success', text: 'Your password has been reset successfully! You can now log in with your new password.' });
    console.log('Password reset successful (simulated)');
    // Optional: redirect after a delay
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <AuthPageLayout title="Set Your New Password">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Password</CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it's strong and memorable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'bg-green-50 border-green-300 text-green-700' : ''}>
                 {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{message.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            {!message?.text.startsWith("Your password has been reset") && (
              <>
                <PasswordField
                  label="New Password"
                  id="new-password"
                  name="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <PasswordField
                  label="Confirm New Password"
                  id="confirm-new-password"
                  name="confirm-new-password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
                <div>
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
         {message?.text.startsWith("Your password has been reset") && (
            <CardFooter className="text-sm text-center block">
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Proceed to Login
                </Link>
            </CardFooter>
        )}
      </Card>
    </AuthPageLayout>
  );
};

export default ResetPasswordPage;