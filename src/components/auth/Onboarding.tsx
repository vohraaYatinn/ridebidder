
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { ChevronRight, MapPin, Clock, DollarSign, Star, Car, Navigation, MapIcon, Users, IndianRupee } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      icon: <Car size={48} className="text-primary" />,
      title: "Drive Your Way",
      description: "Join our network of professional drivers and start earning on your own schedule."
    },
    {
      icon: <MapPin size={48} className="text-primary" />,
      title: "Find Nearby Rides",
      description: "Browse and bid on available rides in your area with just a few taps."
    },
    {
      icon: <Navigation size={48} className="text-primary" />,
      title: "Smart Navigation",
      description: "Get the best routes with real-time traffic updates for efficient pickups and drop-offs."
    },
    {
      icon: <IndianRupee size={48} className="text-primary" />,
      title: "Competitive Earnings",
      description: "Set your own prices and maximize your earning potential."
    }
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };
  
  const skipToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-background">
      <div className="w-full flex justify-end">
        {currentSlide < slides.length - 1 && (
          <Button variant="ghost" onClick={skipToLogin}>
            Skip
          </Button>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        <div className="flex flex-col items-center space-y-8 mb-12 animate-fade-in">
          <div className="p-6 bg-secondary/30 rounded-full">
            {slides[currentSlide].icon}
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground">{slides[currentSlide].description}</p>
          </div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <MapIcon className="h-8 w-8 text-blue-400 animate-pulse" />
            <Users className="h-8 w-8 text-green-400" />
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      </div>
      
      <div className="w-full space-y-8">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-primary w-6'
                  : 'bg-secondary'
              }`}
            />
          ))}
        </div>
        
        <Button 
          className="w-full flex items-center justify-between"
          onClick={nextSlide}
        >
          <span className="flex-1">
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </span>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
