import React, { useState } from 'react';
import { bids as mockBids } from '@/data/mockData';
import BidCard from '@/components/rides/BidCard';
import BottomNavigation from '@/components/common/BottomNavigation';
import { toast } from '@/hooks/use-toast';

const BidsPage = () => {
  const [bids, setBids] = useState(mockBids);
  
  const handleCancelBid = (bidId: string) => {
    setBids(prevBids => 
      prevBids.map(bid => 
        bid.id === bidId 
          ? { ...bid, status: 'CANCELLED' as const } 
          : bid
      )
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <h1 className="text-2xl font-bold">My Bids</h1>
      </header>
      
      <main className="p-4 space-y-4">
        {bids.length > 0 ? (
          bids.map(bid => (
            <BidCard 
              key={bid.id} 
              bid={bid} 
              onCancel={handleCancelBid}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No bids yet</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BidsPage;
