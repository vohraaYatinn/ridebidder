import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rides as mockRides } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Clock, DollarSign, User, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RideDetailPage = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  
  // Find the ride from mock data (in a real app, you would fetch this from an API)
  const ride = mockRides.find(r => r.id === rideId);
  
  useEffect(() => {
    // If ride not found, redirect to dashboard
    if (!ride) {
      navigate('/dashboard');
      toast({
        title: "Ride not found",
        description: "The requested ride could not be found.",
        variant: "destructive"
      });
    }
  }, [ride, navigate]);
  
  if (!ride) return null;
  
  const handleBidSubmit = () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid bid amount",
        description: "Please enter a valid bid amount.",
        variant: "destructive"
      });
      return;
    }
    
    console.log(`Bid of $${amount} placed on ride ${rideId}`);
    toast({
      title: "Bid Placed",
      description: `Your bid of $${amount} has been submitted.`,
    });
    
    // In a real app, you would send this to an API
    // Then navigate back to dashboard
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Ride Details</h1>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Ride Details Card */}
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="space-y-4">
            {/* Locations */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-0.5 h-10 bg-border mx-auto my-1"></div>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">{ride.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dropoff</p>
                    <p className="font-medium">{ride.dropLocation}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ride Info */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{ride.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Fare</p>
                  <p className="font-medium">${ride.estimatedFare}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="font-medium">{ride.distance} miles</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Passenger</p>
                  <p className="font-medium">{ride.passengerName}</p>
                </div>
              </div>
            </div>
            
            {/* Additional Details */}
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">Notes</p>
              <p>{ride.notes || "No special instructions"}</p>
            </div>
          </div>
        </div>
        
        {/* Bid Section */}
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Place Your Bid</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="bidAmount" className="block text-sm font-medium mb-1">
                Your Bid Amount (₹)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Suggested bid: ${(ride.estimatedFare * 0.9).toFixed(2)} - ${(ride.estimatedFare * 1.1).toFixed(2)}
              </p>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleBidSubmit}
              disabled={!bidAmount || parseFloat(bidAmount) <= 0}
            >
              Submit Bid
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideDetailPage; 