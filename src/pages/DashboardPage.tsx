
import React, { useState } from 'react';
import { rides as mockRides } from '@/data/mockData';
import RideCard from '@/components/rides/RideCard';
import BottomNavigation from '@/components/common/BottomNavigation';
import { toast } from '@/components/ui/sonner';
import { Search } from 'lucide-react';

const DashboardPage = () => {
  const [rides, setRides] = useState(mockRides);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleBidSubmit = (rideId: string, amount: number) => {
    console.log(`Bid of $${amount} placed on ride ${rideId}`);
    // In a real app, you would send this to an API
  };
  
  const filteredRides = rides.filter(ride => 
    ride.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Available Rides</h1>
          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">A</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </header>
      
      <main className="p-4 pt-2 space-y-4">
        {filteredRides.length > 0 ? (
          filteredRides.map(ride => (
            <RideCard 
              key={ride.id} 
              ride={ride} 
              onBidSubmit={handleBidSubmit}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No rides found</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default DashboardPage;
