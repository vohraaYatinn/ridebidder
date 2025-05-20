import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CheckCircle, XCircle, Clock, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/common/BottomNavigation';
import { useLocation } from "react-router-dom";

// Mock data (in a real app, this would come from an API)

const TotalBidsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total_bids } = location.state || {}
  const [activeTab, setActiveTab] = useState('pending');
  
  const filteredBids = total_bids?total_bids?.filter(bid => bid.status.toLowerCase() === activeTab):[];
  console.log("total_bids",filteredBids);
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
            <IndianRupee className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Your Bids</h1>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Bids</p>
          <p className="text-2xl font-bold">{total_bids?.length}</p>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
          <div>
              <p className="text-yellow-500 font-medium">
                {total_bids?.filter(bid => bid.status === 'pending').length}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div>
              <p className="text-green-500 font-medium">
                {total_bids?.filter(bid => bid.status === 'accepted').length}
              </p>
              <p className="text-xs text-muted-foreground">Accepted</p>
            </div>

            <div>
              <p className="text-red-500 font-medium">
                {total_bids?.filter(bid => bid.status === 'rejected').length}
              </p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4 mt-2">
            {filteredBids && filteredBids?.length > 0 ? (
              filteredBids.map((bid:any) => (
                <div 
                  key={bid.id} 
                  className="bg-card rounded-lg p-4 border border-border shadow-sm cursor-pointer"
                  
                >
                  {/* Top Row: Trip Type & Payment */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {bid?.booking?.trip_type ? bid.booking.trip_type.replace('_', ' ').toUpperCase() + ' TRIP' : 'TRIP'}
                    </span>
                    <span className="bg-muted text-xs px-2 py-1 rounded-full font-medium border border-border">
                      {bid?.booking?.payment_type ? `Paid by ${bid.booking.payment_type}` : 'Paid'}
                    </span>
                  </div>

                  {/* Pickup & Dropoff */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="mt-1 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-0.5 h-8 bg-border mx-auto my-1"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <div className="flex-1">
                      <div>
                        <span className="text-xs text-muted-foreground">Pickup :</span>
                        <span className="block text-sm font-medium leading-tight">{bid?.booking?.pickup_location}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">Drop :</span>
                        <span className="block text-sm font-medium leading-tight">{bid?.booking?.drop_location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fare, Distance */}
                  <div className="grid grid-cols-2 gap-2 text-center my-2">
                    <div>
                      <p className="flex items-center justify-center gap-1 text-primary font-semibold text-base">
                        <IndianRupee className="h-4 w-4" /> {bid?.bid_amount}
                      </p>
                      <span className="text-xs text-muted-foreground">Your Bid</span>
                    </div>
                    <div>
                      <p className="flex items-center justify-center gap-1 text-sm font-medium">
                        <ArrowLeft className="h-4 w-4 rotate-90" />
                        {bid?.booking?.trip_km} KM
                      </p>
                      <span className="text-xs text-muted-foreground">Est. Distance</span>
                    </div>
                  </div>

                  {/* Departure Date/Time */}
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Departure:</span>
                    <span className="text-xs font-medium">
                      {bid?.booking?.pickup_date ? new Date(bid.booking.pickup_date).toLocaleString() : '--'}
                    </span>
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