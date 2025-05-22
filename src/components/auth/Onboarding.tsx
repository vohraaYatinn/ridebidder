import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { ChevronRight } from 'lucide-react';
import car from '../../images/yellowsports.png';
import bg from '../../images/background.png';

// Unsplash yellow Audi sports car image
const carImg = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleGo = () => {
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between p-0 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col items-center flex-1 w-full max-w-md mx-auto pt-12">
        <img
          src={car}
          alt="Yellow Audi Sports Car"
          className="w-[320px] h-[260px] object-contain mb-8 drop-shadow-xl"
          style={{ marginTop: '32px' }}
        />
        <div className="text-center px-6">
          <h2 className="text-4xl font-extrabold text-black mb-4 leading-tight" style={{
            textAlign:"start",
            fontFamily:"monospace"
          }}>Anytime,<br />anywhere</h2>
          <p className="text-base text-neutral-500 mb-8" style={{
            textAlign:"start"
          }}>Your reliable partner for getting around the city. With our convenient taxi app, you can always reach your destination quickly and comfortably.</p>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto px-6 pb-10">
        <Button
          className="w-full flex items-center justify-between bg-white rounded-2xl py-5 px-6 text-lg font-semibold text-black hover:bg-neutral-100 transition-all"
          style={{ 
            border: '1px solid rgba(0,0,0,0.15)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderRadius: '1rem',
          }}
        >
          <span className="flex-1 text-left">Go</span>
          <span className="flex items-center space-x-1">
            <ChevronRight size={22} />
            <ChevronRight size={22} className="-ml-3" />
            <ChevronRight size={22} className="-ml-3" />
            <ChevronRight size={22} className="-ml-3" />
            <ChevronRight size={22} className="-ml-3" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
