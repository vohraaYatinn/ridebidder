import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';
import { useLocation } from 'react-router-dom';
import moment from "moment";
// Mock data (in a real app, this would come from an API)


const OngoingRidesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ongoing_rides } = location.state || {}

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Ongoing Rides</h1>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">Currently Active</p>
          <p className="text-2xl font-bold">{ongoing_rides?.length} Rides</p>
        </div>
        
        <div className="space-y-4">
          {ongoing_rides?.map(ride => (
            <div key={ride.id} className="bg-card rounded-lg p-4 border border-border shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{ride?.passengerName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ride.status === 'In Progress' 
                    ? 'bg-green-100 text-green-800' 
                    : ride.status === 'Picking Up'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {ride?.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="w-0.5 h-10 bg-border mx-auto my-1"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-xs text-muted-foreground">Pickup</p>
                      <p className="text-sm">{ride?.pickup_location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dropoff</p>
                      <p className="text-sm">{ride?.drop_location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Started at</p>
                  <p className="text-sm font-medium">{moment(ride?.pickup_date).format("MMMM D, YYYY h:mm A")}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Est. Fare</p>
                  <p className="text-sm font-medium">${ride?.bid_amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default OngoingRidesPage; 