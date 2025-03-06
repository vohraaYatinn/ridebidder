import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/common/BottomNavigation';

// Mock data (in a real app, this would come from an API)
const mockBids = [
  {
    id: 'bid-001',
    rideId: 'ride-201',
    passengerName: 'Emma Thompson',
    pickupLocation: '123 Main St, Boston, MA',
    dropLocation: '456 Park Ave, Boston, MA',
    bidAmount: 22.50,
    estimatedFare: 25.00,
    status: 'Accepted',
    date: '2023-11-15',
    time: '10:30 AM'
  },
  {
    id: 'bid-002',
    rideId: 'ride-202',
    passengerName: 'Daniel Wilson',
    pickupLocation: '789 Oak Dr, Cambridge, MA',
    dropLocation: '101 Pine St, Boston, MA',
    bidAmount: 18.00,
    estimatedFare: 20.00,
    status: 'Pending',
    date: '2023-11-15',
    time: '11:15 AM'
  },
  {
    id: 'bid-003',
    rideId: 'ride-203',
    passengerName: 'Olivia Martinez',
    pickupLocation: '222 Elm St, Somerville, MA',
    dropLocation: '333 Maple Rd, Boston, MA',
    bidAmount: 30.00,
    estimatedFare: 32.00,
    status: 'Rejected',
    date: '2023-11-14',
    time: '12:00 PM'
  },
  {
    id: 'bid-004',
    rideId: 'ride-204',
    passengerName: 'Noah Johnson',
    pickupLocation: '444 Cedar Ln, Boston, MA',
    dropLocation: '555 Birch Ave, Cambridge, MA',
    bidAmount: 25.00,
    estimatedFare: 27.25,
    status: 'Accepted',
    date: '2023-11-14',
    time: '3:45 PM'
  },
  {
    id: 'bid-005',
    rideId: 'ride-205',
    passengerName: 'Sophia Brown',
    pickupLocation: '666 Walnut St, Boston, MA',
    dropLocation: '777 Cherry Blvd, Somerville, MA',
    bidAmount: 21.00,
    estimatedFare: 22.50,
    status: 'Pending',
    date: '2023-11-13',
    time: '9:20 AM'
  }
];

const TotalBidsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredBids = activeTab === 'all' 
    ? mockBids 
    : mockBids.filter(bid => bid.status.toLowerCase() === activeTab);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
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
            <DollarSign className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Your Bids</h1>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Bids</p>
          <p className="text-2xl font-bold">{mockBids.length}</p>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
            <div>
              <p className="text-green-500 font-medium">
                {mockBids.filter(bid => bid.status === 'Accepted').length}
              </p>
              <p className="text-xs text-muted-foreground">Accepted</p>
            </div>
            <div>
              <p className="text-yellow-500 font-medium">
                {mockBids.filter(bid => bid.status === 'Pending').length}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div>
              <p className="text-red-500 font-medium">
                {mockBids.filter(bid => bid.status === 'Rejected').length}
              </p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4 mt-2">
            {filteredBids.length > 0 ? (
              filteredBids.map(bid => (
                <div 
                  key={bid.id} 
                  className="bg-card rounded-lg p-4 border border-border shadow-sm"
                  onClick={() => navigate(`/rides/${bid.rideId}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{bid.passengerName}</h3>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(bid.status)}
                      <span className={`text-xs font-medium ${
                        bid.status === 'Accepted' 
                          ? 'text-green-800' 
                          : bid.status === 'Rejected'
                          ? 'text-red-800'
                          : 'text-yellow-800'
                      }`}>
                        {bid.status}
                      </span>
                    </div>
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
                          <p className="text-sm">{bid.pickupLocation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Dropoff</p>
                          <p className="text-sm">{bid.dropLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Your Bid</p>
                      <p className="text-sm font-medium">${bid.bidAmount.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Est. Fare</p>
                      <p className="text-sm font-medium">${bid.estimatedFare.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No bids found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TotalBidsPage; 