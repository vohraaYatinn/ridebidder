import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerificationPendingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center animate-fade-in">
        <CardHeader>
          <div className="flex flex-col items-center justify-center">
            <ShieldCheck className="w-14 h-14 text-green-500 mb-2" />
            <CardTitle className="text-2xl font-bold mb-2">Verification in Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Your documents are under verification.<br />
            We will notify you once the process is complete.
          </p>
          <Button variant="default" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPendingPage; 