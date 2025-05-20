import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { ChevronRight } from 'lucide-react';
import car from '../../images/onboarding.png';
const Onboarding = () => {
  const navigate = useNavigate();

  const handleGo = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-background">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        <div className="flex flex-col items-center space-y-8 mb-12 animate-fade-in">
          <img src={car} alt="Car" className="w-64 h-64 object-contain" />
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Anytime, anywhere</h2>
            <p className="text-muted-foreground">Your ride is just a tap away</p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-8">
        <div className="flex justify-center space-x-2">

        </div>
        <Button className="w-full flex items-center justify-between" onClick={handleGo}>
          <span className="flex-1">Go</span>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
