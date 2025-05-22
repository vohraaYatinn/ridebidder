import React, { useEffect, useState } from 'react';
import { bids as mockBids } from '@/data/mockData';
import BidCard from '@/components/rides/BidCard';
import BottomNavigation from '@/components/common/BottomNavigation';
import { toast } from '@/hooks/use-toast';
import useAxios from '../hooks/useAxios'
import { getBidsDataDriver, getDashboardDataDriver, placeBidService } from '../urls/urls';
import RideCard from '@/components/rides/RideCard';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const BidsPage = () => {
  const [bids, setBids] = useState([]);
  const [fetch,setFetch] = useState(false)
  const[bidsData,bidsDataError,bidsDataLoading,bidsDataSubmit] = useAxios()  
  const [dashboardData, dashboardDataError, dashboardDataLoading, dashboardDataSubmit] = useAxios();
  const [bidSubmitData, bidSubmitError, bidSubmitLoading, bidSubmitSubmit] = useAxios();
  const [fetchDashboardData, setFetchDashboardData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    bidsDataSubmit(getBidsDataDriver());
  }, [fetch]);
  
  useEffect(() => {
    if (bidsData) {
      console.log(bidsData)
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
  
  // Fetch available rides for bidding
  useEffect(() => {
  console.log(fetchDashboardData)
    if (fetchDashboardData) {
      dashboardDataSubmit(getDashboardDataDriver());
      setFetchDashboardData(false);
    }
  }, [fetchDashboardData]);

  // Handle bid submission for available rides
  const handleBidSubmit = (booking_id, amount) => {
    bidSubmitSubmit(placeBidService({ booking_id: booking_id, bid_amount: amount }));
  };
  // Show toast on bid success
  useEffect(() => {
    if (bidSubmitData && bidSubmitData?.result === 'success') {
      toast({
        title: 'Bid Placed',
        description: 'Your bid has been submitted.',
      });
      setFetchDashboardData(true);
    }
  }, [bidSubmitData]);
  // Show toast on bid error
  useEffect(() => {
    if (bidSubmitError && bidSubmitError?.response?.data?.result === 'failure') {
      toast({
        title: 'Error',
        description: bidSubmitError?.response?.data?.error,
        variant: 'destructive',
      });
    }
  }, [bidSubmitError]);

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
      
      <main className="p-4 space-y-8">
        {/* Tab Switcher */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="available">Available Rides</TabsTrigger>
            <TabsTrigger value="bids">
              My Bids {bids && bids.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-white">
                  {bids.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="available">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Available Rides for Bidding</h2>
              </div>
              <div className="space-y-4">
                {!dashboardDataLoading && dashboardData?.booking ? (
                  dashboardData.booking.map((ride) => (
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
          </TabsContent>
          <TabsContent value="bids">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming Rides</h2>
              </div>
              <div className="space-y-4">
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
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BidsPage;
