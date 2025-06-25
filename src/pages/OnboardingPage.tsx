import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import carImg from '@/images/onboarding.png';
import { MessageCircle, HelpCircle } from 'lucide-react';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(()=>{
    console.log("token2",token)
    if(token){
      navigate('/dashboard');
    }
  }, [token])
 
  const handleGo = () => {
    navigate('/login');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center animate-fade-in py-8 px-4" style={{
        boxShadow:"0 0 0 0"
      }}>
        <CardHeader>
          <div className="flex flex-col items-center justify-center">
            <img
              src={carImg}
              alt="Get Started Logo"
              className="w-60 h-60 object-contain mb-4 drop-shadow-xl"
            />
            <CardTitle className="text-2xl font-bold mb-2">Get Rides. Get Paid. Get Going.</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-8">
          Join the smartest way to drive and earn accept trips, track earnings, and hit the road with ease.
          </p>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full flex items-center justify-center text-lg font-semibold"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
            <Button
              className="w-full flex items-center justify-center text-lg font-semibold border-2"
              variant="outline"
              size="lg"
              onClick={() => navigate('/faq')}
            >
              <HelpCircle className="mr-2" size={22} /> View FAQ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
