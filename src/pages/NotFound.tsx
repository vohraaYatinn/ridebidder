
import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="text-center space-y-4 max-w-md animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
        
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        
        <p className="text-muted-foreground">
          The page <span className="text-foreground font-medium">{location.pathname}</span> you're looking for doesn't exist or has been moved.
        </p>
        
        <Button
          className="mt-6"
          onClick={() => navigate('/dashboard')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
