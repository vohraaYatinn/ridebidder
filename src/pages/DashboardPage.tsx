import React, { useState } from 'react';
import { rides as mockRides } from '@/data/mockData';
import RideCard from '@/components/rides/RideCard';
import BottomNavigation from '@/components/common/BottomNavigation';
import { toast } from '@/hooks/use-toast';
import { Search, Car, Clock, DollarSign, Star, BarChart2 } from 'lucide-react';

// Mock statistics data (in a real app, this would come from an API)
const mockStats = {
  ongoingRides: 3,
  totalRides: 42,
  totalBids: 28,
  averageRating: 4.7,
  recentEarnings: [120, 85, 200, 150, 180, 220, 190]
};

const DashboardPage = () => {
  const [rides, setRides] = useState(mockRides);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleBidSubmit = (rideId: string, amount: number) => {
    console.log(`Bid of $${amount} placed on ride ${rideId}`);
    toast({
      title: "Bid Placed",
      description: `Your bid of $${amount} has been submitted.`,
    });
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
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">A</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Stats Cards */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Ongoing Rides</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{mockStats.ongoingRides}</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Total Rides</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{mockStats.totalRides}</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Total Bids</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{mockStats.totalBids}</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Rating</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{mockStats.averageRating}</p>
          </div>
        </section>
        
        {/* Earnings Graph */}
        <section className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Earnings</h2>
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-40 flex items-end gap-2">
            {mockStats.recentEarnings.map((earning, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary/80 rounded-t-sm transition-all duration-300" 
                  style={{ height: `${(earning / Math.max(...mockStats.recentEarnings)) * 80}%` }}
                ></div>
                <span className="text-xs text-muted-foreground mt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </span>
                <span className="text-xs font-medium">${earning}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Available Rides for Bidding */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Available Rides for Bidding</h2>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search rides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-4">
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
          </div>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default DashboardPage;
