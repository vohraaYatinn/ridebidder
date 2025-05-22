import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Filter, MapPin, Clock as ClockIcon, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';
import moment from "moment";
import useAxios from '@/hooks/useAxios';
import { endTrip,collectPayment } from '@/urls/urls';
import Modal from '@/components/common/Modal';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


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
              
              <div className="space-y-4">
                {total_rides.map(ride => (
                  <div 
                    key={ride.id} 
                    className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold text-lg">
                            {ride.passengerName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base">{ride.passengerName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {moment(ride.pickup_date).format("MMM D, h:mm A")}
                          </p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        ride.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      )}>
                        {ride?.status}
                      </span>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <div className="w-0.5 h-16 bg-border my-1"></div>
                          <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Pickup</p>
                              <p className="text-sm text-muted-foreground">{ride?.pickup_location}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Dropoff</p>
                              <p className="text-sm text-muted-foreground">{ride?.drop_location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {moment(ride.pickup_date).format("MMMM D, YYYY")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Bid Amount</p>
                        <p className="text-base font-semibold flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {ride?.bids[0].bid_amount}
                        </p>
                      </div>
                    </div>

                    {ride?.extra_fare > 0 && (
                      <>
                        <div className="flex justify-between items-center pt-4 border-t border-border mt-4">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Extra KM</p>
                            <p className="text-sm font-medium">{ride?.extra_trip_km} km</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Extra Amount</p>
                            <p className="text-base font-semibold flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {ride?.extra_fare}
                            </p>
                          </div>
                        </div>
                        
                        {!ride?.is_extra_fare_paid && (
                          <Button 
                            disabled={collectLoading}
                            className="w-full mt-4"
                            onClick={() => handleCollect(ride?.id)}
                          >
                            Collect Extra Fare
                          </Button>
                        )}
                      </>
                    )}
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