import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';

// Mock data (in a real app, this would come from an API)
const mockOngoingRides = [
  {
    id: 'ride-001',
    passengerName: 'John Smith',
    pickupLocation: '123 Main St, Boston, MA',
    dropLocation: '456 Park Ave, Boston, MA',
    startTime: '10:30 AM',
    status: 'In Progress',
    estimatedFare: 24.50
  },
  {
    id: 'ride-002',
    passengerName: 'Emily Johnson',
    pickupLocation: '789 Oak Dr, Cambridge, MA',
    dropLocation: '101 Pine St, Boston, MA',
    startTime: '11:15 AM',
    status: 'Picking Up',
    estimatedFare: 18.75
  },
  {
    id: 'ride-003',
    passengerName: 'Michael Brown',
    pickupLocation: '222 Elm St, Somerville, MA',
    dropLocation: '333 Maple Rd, Boston, MA',
    startTime: '12:00 PM',
    status: 'Scheduled',
    estimatedFare: 32.00
  }
];

const OngoingRidesPage = () => {
  const navigate = useNavigate();

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
          <p className="text-2xl font-bold">{mockOngoingRides.length} Rides</p>
        </div>
        
        <div className="space-y-4">
          {mockOngoingRides.map(ride => (
            <div key={ride.id} className="bg-card rounded-lg p-4 border border-border shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{ride.passengerName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ride.status === 'In Progress' 
                    ? 'bg-green-100 text-green-800' 
                    : ride.status === 'Picking Up'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
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
                  <p className="text-xs text-muted-foreground">Started at</p>
                  <p className="text-sm font-medium">{ride.startTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Est. Fare</p>
                  <p className="text-sm font-medium">${ride.estimatedFare.toFixed(2)}</p>
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