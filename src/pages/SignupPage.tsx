
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">RB</span>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">D</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Create Account</h1>
          <p className="text-muted-foreground">Sign up to start driving</p>
        </div>
        
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
