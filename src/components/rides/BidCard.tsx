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
      <CardHeader className="pb-2 border-b border-border/20">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            {moment(bid?.booking?.pickup_date).format('DD-MM-YYYY')}
          </CardTitle>
          <Badge variant={getBadgeVariant()}>
            {bid?.status.charAt(0) + bid?.status.slice(1).toLowerCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start">
            <MapPin className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Pickup</p>
              <p className="text-sm text-muted-foreground">{bid?.booking?.pickup_location}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Navigation className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Dropoff</p>
              <p className="text-sm text-muted-foreground">{bid?.booking?.drop_location}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="flex items-center">
            <IndianRupee className="mr-2 h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">{bid?.bid_amount}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-blue-400" />
            <span className="text-sm">{formatDate(bid?.timestamp).split(',')[0]}</span>
          </div>
        </div>

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
