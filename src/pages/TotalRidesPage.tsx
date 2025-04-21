import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';
import moment from "moment";
import useAxios from '@/hooks/useAxios';
import { endTrip,collectPayment } from '@/urls/urls';
import Modal from '@/components/common/Modal';
import { toast } from '@/hooks/use-toast';


const TotalRidesPage = () => {
  const [collectResponse, collectError, collectLoading, collectSubmit] = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { total_rides } = location.state || {}
  const [showModal, setShowModal] = useState(false);
  
  // Group rides by date
  // const ridesByDate = total_rides.reduce((acc, ride) => {
  //   if (!acc[ride.date]) {
  //     acc[ride.date] = [];
  //   }
  //   acc[ride.date].push(ride);
  //   return acc;
  // }, {});

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };
  const handleCollect = (booking_id) => {
    collectSubmit(collectPayment({booking_id:booking_id}))
    setShowModal(false);

  };

  useEffect(()=>{
    if(collectResponse && collectResponse?.['message'] =='success'){
      toast({
        title: "Payment Collected",
        description: "Success.",
        variant: "default",
      });

      navigate('/dashboard')
    }
  },[collectResponse])
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
            <p className="text-2xl font-bold">{total_rides?.length}</p>
          </div>
          
          {/* <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="h-5 w-5" />
          </Button> */}
        </div>
        
        <div className="space-y-6">

            <div className="space-y-3">
              {/* <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-medium text-muted-foreground">{}</h2>
              </div> */}
              
              <div className="space-y-3">
                {total_rides.map(ride => (
                  <div 
                    key={ride.id} 
                    className="bg-card rounded-lg p-4 border border-border shadow-sm"
                   
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{ride.passengerName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ride.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ride?.status}
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
                            <p className="text-sm">{ride?.pickup_location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Dropoff</p>
                            <p className="text-sm">{ride?.drop_location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="text-sm font-medium">{ moment(ride.pickup_date).format("MMMM D, YYYY h:mm A")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Bid Ammount</p>
                        <p className="text-sm font-medium">₹{ride?.bids[0].bid_amount}</p>
                      </div>
                      </div>
                      {ride?.extra_fare>0?<>
                        <div className="flex justify-between items-center pt-2 border-t border-border">
                        <div>
                        <p className="text-xs text-muted-foreground">Extra KM</p>
                        <p className="text-sm font-medium">₹{ride?.extra_trip_km}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total Extra Amount</p>
                        <p className="text-sm font-medium">₹{ride?.extra_fare}</p>
                      </div>
                      </div>
                   {!ride?.is_extra_fare_paid?   <Button disabled={collectLoading}className="w-full" onClick={()=>{handleCollect(ride?.id)}}>
            Collect 
          </Button>:<></>}
                      
                      </>
                      :<></>}
                    
                  </div>
                ))}
              </div>
            </div>
          
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TotalRidesPage; 