import React, { useEffect, useState } from 'react';
import { bids as mockBids } from '@/data/mockData';
import BidCard from '@/components/rides/BidCard';
import BottomNavigation from '@/components/common/BottomNavigation';
import { toast } from '@/hooks/use-toast';
import useAxios from '../hooks/useAxios'
import { getBidsDataDriver } from '../urls/urls';
const BidsPage = () => {
  const [bids, setBids] = useState([]);
  const [fetch,setFetch] = useState(false)
  const[bidsData,bidsDataError,bidsDataLoading,bidsDataSubmit] = useAxios()  
  useEffect(() => {
    bidsDataSubmit(getBidsDataDriver());
  }, [fetch]);
  
  useEffect(() => {
    if (bidsData) {
      setBids(bidsData?.data);
    }
  }, [bidsData]);   
  useEffect(() => {
    if (bidsDataError) {
      toast({
        title: 'Error',
        description: 'Failed to fetch bids data',
        variant: 'destructive',
      });
    }
  }, [bidsDataError]);
  
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
        <h1 className="text-2xl font-bold">My Rides</h1>
      </header>
      
      <main className="p-4 space-y-4">
        {bids?.length > 0 ? (
          bids.map(bid => (
            <BidCard 
              key={bid.id} 
              bid={bid} 
              onCancel={handleCancelBid}
              setFetch={setFetch}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No Rides yet</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BidsPage;
