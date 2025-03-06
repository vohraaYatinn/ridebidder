
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import { FileCheck, Shield, Navigation } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <FileCheck size={80} className="text-green-400" />
      </div>
      <div className="absolute bottom-0 left-0 p-8 opacity-10">
        <Navigation size={80} className="text-blue-400" />
      </div>
      
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
          <h1 className="text-2xl font-bold mb-1">Driver Registration</h1>
          <p className="text-muted-foreground">Join our network and start earning</p>
          
          <div className="flex justify-center space-x-2 mt-4">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-xs text-muted-foreground">Secure verification process</span>
          </div>
        </div>
        
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
