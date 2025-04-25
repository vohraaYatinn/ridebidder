
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Clock, Wallet, User } from 'lucide-react';

const BottomNavigation = ({assigned_rides_number=0}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: <div>Rides {assigned_rides_number ? <span style={{
      background: 'red',
      color:"white",
      padding:"2px",
      border:"1px solid white",
      borderRadius:"100px",
    }}>{assigned_rides_number}</span>:""}</div>, path: '/bids', icon: Clock },

    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: User },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 z-50 backdrop-blur-lg bg-opacity-80">
      <div className="flex justify-around items-center">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.name}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all ${
                active 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className={`p-1 ${active ? 'bg-primary/10 rounded-lg' : ''}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
