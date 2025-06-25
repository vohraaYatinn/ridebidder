import React, { useEffect, useState } from 'react';
import { Car, Clock, IndianRupee, ArrowRightLeft, Camera, Gauge, User, Phone, Snowflake, LockKeyhole } from 'lucide-react';
import moment from 'moment';
import { toast } from '@/hooks/use-toast';
import useAxios from '@/hooks/useAxios'
import { startTrip } from '@/urls/urls'

const BidCard = ({ bid, onCancel, setFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTripFields, setShowTripFields] = useState(false);
  const [meterPhoto, setMeterPhoto] = useState(null);
  const [cabPhoto, setCabPhoto] = useState(null);
  const [currentKm, setCurrentKm] = useState('');
  const [tripResponse,tripError,tripLoading,tripSubmit] = useAxios();
  const [shouldShowDetails, setShouldShowDetails] = useState(false);
  const [timeUntilVisible, setTimeUntilVisible] = useState('');

  // Extract cab details
  const cabDetails = bid?.booking?.cab || {};
  const cabCategoryName = cabDetails?.category?.category_name || 'Cab';
  const cabName = cabDetails?.cab_name || 'Not specified';
  const extraKmRate = cabDetails?.extra_rate_per_km || '0.00';
  const isAC = cabDetails?.ac_type === 'ac';

  // Check if we should show passenger details
  useEffect(() => {
    const checkVisibility = () => {
      const departureTime = moment(bid?.booking?.pickup_date);
      const now = moment();
      const hoursUntilDeparture = departureTime.diff(now, 'hours', true);
      
      // Show details if within 2 hours of departure
      setShouldShowDetails(hoursUntilDeparture <= 2);
      
      // Calculate time remaining until visible
      if (hoursUntilDeparture > 2) {
        const timeLeft = moment.duration(hoursUntilDeparture - 2, 'hours');
        setTimeUntilVisible(
          `${Math.floor(timeLeft.asHours())}h ${timeLeft.minutes()}m`
        );
      } else {
        setTimeUntilVisible('');
      }
    };

    checkVisibility();
    // Update every minute
    const interval = setInterval(checkVisibility, 60000);
    return () => clearInterval(interval);
  }, [bid?.booking?.pickup_date]);

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

  const handleMeterPhotoCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use the back camera
    input.click();

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setMeterPhoto(file);
        toast({
          title: "Meter photo captured",
          description: "Meter reading photo has been captured successfully.",
          variant: "default",
        });
      }
    };
  };

  const handleCabPhotoCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use the back camera
    input.click();

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setCabPhoto(file);
        toast({
          title: "Cab photo captured",
          description: "Cab photo has been captured successfully.",
          variant: "default",
        });
      }
    };
  };

  const handleSubmitTripDetails = () => {
    if (!meterPhoto || !cabPhoto || !currentKm) {
      toast({
        title: "Missing fields",
        description: "Please capture both meter and cab photos, and enter the current kilometers.",
        variant: "destructive",
      });
      return;
    }
    else {
      try {
        const formData = new FormData();
        
        // Add each field individually and ensure proper types
        formData.append('booking_id', String(bid?.booking?.id));
        formData.append('start_km', String(currentKm));
        
        // Handle the image files
        if (meterPhoto instanceof File) {
          formData.append('start_trip_image', meterPhoto);
        }
        if (cabPhoto instanceof File) {
          formData.append('cab_image', cabPhoto);
        }
        
        // Log FormData contents for debugging
        console.log('Submitting form data:');
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
        }
        
        // Send the form data
        tripSubmit(startTrip(formData));
      } catch (error) {
        console.error('Error preparing form data:', error);
        toast({
          title: "Error",
          description: "There was an error preparing the trip data. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(()=>{
    if (tripResponse?.['message'] =='success'){
      setShowTripFields(false)
      setFetch(true)
      toast({
        title: "Trip Started",
        description: "Trip details submitted successfully.",
        variant: "default",
      });
    }
    else if (tripResponse?.['message'] =='fail'){
      toast({
        title: "Trip Started",
        description: "Something Went Wrong",
        variant: "destructive",
      });
    }
  },[tripResponse])

  return (
    <div
      className="bg-white rounded-2xl shadow border p-0 flex flex-col cursor-pointer hover:shadow-lg transition overflow-hidden mb-4"
      style={{ maxWidth: 400, margin: 'auto' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 pt-4">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          {bid?.booking?.trip_mode ? bid.booking.trip_mode.replace('_', ' ').toUpperCase() : ''}
          {bid?.booking?.trip_type ? ' - ' + bid.booking.trip_type.replace('_', ' ').toUpperCase() : ''}
        </span>
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-semibold">
          Paid by {bid?.booking?.payment_type || 'Cash'}
        </span>
      </div>

      {!shouldShowDetails && timeUntilVisible && (
        <div className="px-4 pt-2">
          <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-lg">
            <LockKeyhole className="h-4 w-4" />
            <span className="text-xs font-medium">
              Passenger details will be visible in {timeUntilVisible}
            </span>
          </div>
        </div>
      )}

      {/* User Details */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-4 w-4" />
          <div>
            <div className="text-xs text-gray-500 font-medium">Passenger</div>
            <div className={`font-semibold text-gray-800 ${!shouldShowDetails ? 'blur-sm select-none' : ''}`}>
              {shouldShowDetails 
                ? (bid?.booking?.user?.first_name || bid?.booking?.user?.username)
                : 'XXXXX XXXXX'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <Phone className="h-4 w-4" />
          <div>
            <div className="text-xs text-gray-500 font-medium">Contact</div>
            <div className={`font-semibold text-gray-800 ${!shouldShowDetails ? 'blur-sm select-none' : ''}`}>
              {shouldShowDetails 
                ? bid?.booking?.user?.phone_number
                : 'XXXXX XXXXX'}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 my-2" />

      {/* Cab Details */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Cab Details</div>
              <div className="font-semibold text-gray-800">{cabName}</div>
            </div>
          </div>
          {isAC && (
            <div className="flex items-center gap-1 text-blue-600">
              <Snowflake className="h-4 w-4" />
              <span className="text-xs font-medium">AC</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 my-2" />

      {/* Pickup Address */}
      <div className="px-4 pt-2 pb-2">
        <div className="text-xs text-gray-500 font-medium mb-1">Pickup :</div>
        <div className="font-bold text-gray-800 leading-tight text-base">
          {bid?.booking?.pickup_location}
        </div>
      </div>

      {/* Drop Location */}
      <div className="px-4 pt-2 pb-2">
        <div className="text-xs text-gray-500 font-medium mb-1">Drop :</div>
        <div className="font-bold text-gray-800 leading-tight text-base">
          {bid?.booking?.drop_location}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 my-2" />

      {/* Main Info Grid */}
      <div className="grid grid-cols-3 text-center px-2 py-2">
        <div className="flex flex-col items-center justify-center">
          <IndianRupee className="h-6 w-6 text-green-600 mb-1" />
          <div className="font-bold text-lg text-green-700">Rs {bid?.bid_amount}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Car className="h-6 w-6 text-yellow-600 mb-1" />
          <div className="font-bold text-base text-gray-700 text-center">{cabCategoryName}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ArrowRightLeft className="h-6 w-6 text-gray-500 mb-1" />
          <div className="font-bold text-base text-gray-700">{bid?.booking?.trip_km} km</div>
        </div>
      </div>

      <div className="text-xs text-gray-600 border-t border-b border-gray-100 py-2 text-center">
        Rs {extraKmRate}/km <span className="text-gray-400">(for extra km)</span>
      </div>

      <div className="text-xs text-center text-gray-700 py-2 border-b border-gray-100">
        Toll & State Tax Extra<br />Parking Extra, if applicable
      </div>

      {/* Departure */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Clock className="h-4 w-4" />
          <span>Departure:</span>
        </div>
        <div className="font-semibold text-gray-800 text-sm">
          {bid?.booking?.pickup_date ? moment(bid.booking.pickup_date).format('MMM DD, YYYY hh:mm A') : ''}
        </div>
      </div>

      {/* Start Trip Button (if applicable) */}
      {bid.status === 'accepted' && bid?.booking?.status === 'driver assigned' && !showTripFields && (
        <div className="flex gap-2 mt-2 px-4 pb-4">
          <button
            className="bg-primary text-white rounded-lg px-4 py-2 font-semibold flex-1"
            onClick={handleStartTripClick}
          >
            Start Trip
          </button>
        </div>
      )}

      {/* Trip Start Fields (if shown) */}
      {showTripFields && (
        <div className="space-y-3 border-t pt-4 px-4 pb-4">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium flex-1">Meter Photo</span>
            <button
              onClick={handleMeterPhotoCapture}
              className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              <Camera className="h-4 w-4" />
              {meterPhoto ? 'Retake Photo' : 'Take Photo'}
            </button>
          </div>
          {meterPhoto && (
            <div className="text-xs text-green-600 pl-6">✓ Meter photo captured</div>
          )}

          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium flex-1">Cab Photo</span>
            <button
              onClick={handleCabPhotoCapture}
              className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              <Camera className="h-4 w-4" />
              {cabPhoto ? 'Retake Photo' : 'Take Photo'}
            </button>
          </div>
          {cabPhoto && (
            <div className="text-xs text-green-600 pl-6">✓ Cab photo captured</div>
          )}

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

          <button
            className="bg-primary text-white rounded-lg px-4 py-2 font-semibold w-full mt-4"
            onClick={handleSubmitTripDetails}
            disabled={tripLoading || !meterPhoto || !cabPhoto || !currentKm}
          >
            {tripLoading ? 'Submitting...' : 'Submit Trip Details'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BidCard;
