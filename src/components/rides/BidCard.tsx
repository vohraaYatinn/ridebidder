import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { MapPin, Navigation, IndianRupee, Calendar, Camera, Gauge } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { toast } from '@/hooks/use-toast';
import moment from "moment";
import useAxios from '@/hooks/useAxios'
import { startTrip } from '@/urls/urls'


const BidCard = ({ bid, onCancel,setFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTripFields, setShowTripFields] = useState(false);
  const [meterPhoto, setMeterPhoto] = useState(null);
  const [currentKm, setCurrentKm] = useState('');
  const [tripResponse,tripError,tripLoading,tripSubmit] = useAxios()
console.log(bid)
  const getBadgeVariant = () => {
    switch (bid.status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'cancelled':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleStartTripClick = () => {
    setShowTripFields(true);
  };

  const handleMeterPhotoChange = (e) => {
    const file = e.target.files[0];
    setMeterPhoto(file);
  };

  const handleSubmitTripDetails = () => {
    if (!meterPhoto || !currentKm) {
      toast({
        title: "Missing fields",
        description: "Please upload the meter photo and enter the current kilometers.",
        variant: "destructive",
      });
      return;
    }
    else{
    tripSubmit(startTrip({start_trip_image:meterPhoto,start_km:currentKm,booking_id:bid?.booking?.id}))
    }

    // Do API call here
    console.log("Meter Photo:", meterPhoto);
    console.log("Current Km:", currentKm);


  

   

  };
  useEffect(()=>{
  if (tripResponse?.['message'] =='success'){
    setShowTripFields(false)
    setFetch(true)
  toast({
      title: "Trip Started",
      description: "Trip details submitted successfully.",
      variant: "default",
    });}
    else if (tripResponse?.['message'] =='fail'){
      toast({
        title: "Trip Started",
        description: "Something Went Wrong",
        variant: "destructive",
      });
    }

  
  },[tripResponse])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card variant="glass" className="w-full animate-scale-in">
      {/* Top Row: Trip Type & Payment */}
      <div className="flex justify-between items-center mb-2 px-4 pt-4">
        <span className="text-xs font-semibold tracking-wide uppercase">
          {bid?.booking?.trip_type ? bid.booking.trip_type.replace('_', ' ').toUpperCase() + ' TRIP' : 'TRIP'}
        </span>
        <span className="bg-muted text-xs px-2 py-1 rounded-full font-medium border border-border">
          {bid?.booking?.payment_type ? `Paid by ${bid.booking.payment_type}` : 'Paid'}
        </span>
      </div>

      <CardContent className="pt-2 space-y-4">
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
              <Navigation className="h-4 w-4 rotate-90" />
              {bid?.booking?.trip_km} KM
            </p>
            <span className="text-xs text-muted-foreground">Est. Distance</span>
          </div>
        </div>

        {/* Departure Date/Time */}
        <div className="flex items-center gap-2 mt-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Departure:</span>
          <span className="text-xs font-medium">
            {bid?.booking?.pickup_date ? new Date(bid.booking.pickup_date).toLocaleString() : '--'}
          </span>
        </div>

        {/* Trip Start Fields (if shown) */}
        {showTripFields && (
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <label htmlFor="meterPhoto" className="text-sm font-medium">
                Meter Photo
              </label>
              <input
                id="meterPhoto"
                type="file"
                accept="image/*"
                onChange={handleMeterPhotoChange}
                className="text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <label htmlFor="currentKm" className="text-sm font-medium">
                Current Km
              </label>
              <input
                id="currentKm"
                type="number"
                value={currentKm}
                onChange={(e) => setCurrentKm(e.target.value)}
                placeholder="e.g. 14230"
                className="border px-3 py-1 rounded-md text-sm w-full"
              />
            </div>

            <Button onClick={handleSubmitTripDetails} className="w-full" variant="default">
              Submit Trip Details
            </Button>
          </div>
        )}
      </CardContent>

      {/* Start Trip Button (if applicable) */}
      {bid.status === 'accepted' && bid?.booking?.status=='driver assigned' && !showTripFields && (
        <CardFooter>
          <Button
            className="w-full"
            variant="default"
            onClick={handleStartTripClick}
            isLoading={isLoading}
          >
            Start Trip
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BidCard;
