
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Map, Navigation } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8 animate-slide-up">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">RB</span>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">D</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight">RideBidder</h1>
        <p className="text-muted-foreground">Driver's App</p>
        
        <div className="flex space-x-4 my-2">
          <Car className="h-6 w-6 text-primary animate-bounce" />
          <Map className="h-6 w-6 text-blue-400 animate-pulse" />
          <Navigation className="h-6 w-6 text-green-400 animate-bounce" />
        </div>
        
        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
