import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';

// Mock data (in a real app, this would come from an API)
const mockRideHistory = [
  {
    id: 'ride-101',
    passengerName: 'Sarah Wilson',
    pickupLocation: '123 Main St, Boston, MA',
    dropLocation: '456 Park Ave, Boston, MA',
    date: '2023-11-15',
    time: '10:30 AM',
    fare: 24.50,
    status: 'Completed'
  },
  {
    id: 'ride-102',
    passengerName: 'James Miller',
    pickupLocation: '789 Oak Dr, Cambridge, MA',
    dropLocation: '101 Pine St, Boston, MA',
    date: '2023-11-14',
    time: '11:15 AM',
    fare: 18.75,
    status: 'Completed'
  },
  {
    id: 'ride-103',
    passengerName: 'Robert Taylor',
    pickupLocation: '222 Elm St, Somerville, MA',
    dropLocation: '333 Maple Rd, Boston, MA',
    date: '2023-11-14',
    time: '12:00 PM',
    fare: 32.00,
    status: 'Completed'
  },
  {
    id: 'ride-104',
    passengerName: 'Jennifer Davis',
    pickupLocation: '444 Cedar Ln, Boston, MA',
    dropLocation: '555 Birch Ave, Cambridge, MA',
    date: '2023-11-13',
    time: '3:45 PM',
    fare: 27.25,
    status: 'Completed'
  },
  {
    id: 'ride-105',
    passengerName: 'Michael Brown',
    pickupLocation: '666 Walnut St, Boston, MA',
    dropLocation: '777 Cherry Blvd, Somerville, MA',
    date: '2023-11-12',
    time: '9:20 AM',
    fare: 22.50,
    status: 'Cancelled'
  }
];

const TotalRidesPage = () => {
  const navigate = useNavigate();
  
  // Group rides by date
  const ridesByDate = mockRideHistory.reduce((acc, ride) => {
    if (!acc[ride.date]) {
      acc[ride.date] = [];
    }
    acc[ride.date].push(ride);
    return acc;
  }, {});

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

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
            <Clock className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Ride History</h1>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div className="bg-card rounded-lg p-4 border border-border shadow-sm flex-1 mr-2">
            <p className="text-sm text-muted-foreground mb-1">Total Rides</p>
            <p className="text-2xl font-bold">{mockRideHistory.length}</p>
          </div>
          
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {Object.keys(ridesByDate).sort().reverse().map(date => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-medium text-muted-foreground">{formatDate(date)}</h2>
              </div>
              
              <div className="space-y-3">
                {ridesByDate[date].map(ride => (
                  <div 
                    key={ride.id} 
                    className="bg-card rounded-lg p-4 border border-border shadow-sm"
                    onClick={() => navigate(`/rides/${ride.id}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{ride.passengerName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ride.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ride.status}
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
                            <p className="text-sm">{ride.pickupLocation}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Dropoff</p>
                            <p className="text-sm">{ride.dropLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="text-sm font-medium">{ride.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Fare</p>
                        <p className="text-sm font-medium">${ride.fare.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TotalRidesPage; 