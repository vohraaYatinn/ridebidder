import React, { useEffect, useState } from 'react';
import { Car, Clock, IndianRupee, ArrowRightLeft, Camera, Gauge, User, Phone, Snowflake } from 'lucide-react';
import moment from 'moment';
import { toast } from '@/hooks/use-toast';
import useAxios from '@/hooks/useAxios'
import { startTrip } from '@/urls/urls'

const BidCard = ({ bid, onCancel, setFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTripFields, setShowTripFields] = useState(false);
  const [meterPhoto, setMeterPhoto] = useState(null);
  const [currentKm, setCurrentKm] = useState('');
  const [tripResponse,tripError,tripLoading,tripSubmit] = useAxios()

  // Extract cab details
  const cabDetails = bid?.booking?.cab || {};
  const cabCategoryName = cabDetails?.category?.category_name || 'Cab';
  const cabName = cabDetails?.cab_name || 'Not specified';
  const extraKmRate = cabDetails?.extra_rate_per_km || '0.00';
  const isAC = cabDetails?.ac_type === 'ac';

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

      {/* User Details */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-4 w-4" />
          <div>
            <div className="text-xs text-gray-500 font-medium">Passenger</div>
            <div className="font-semibold text-gray-800">
              {bid?.booking?.user?.first_name || bid?.booking?.user?.username}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <Phone className="h-4 w-4" />
          <div>
            <div className="text-xs text-gray-500 font-medium">Contact</div>
            <div className="font-semibold text-gray-800">
              {bid?.booking?.user?.phone_number}
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
          <button
            className="bg-primary text-white rounded-lg px-4 py-2 font-semibold w-full"
            onClick={handleSubmitTripDetails}
            disabled={tripLoading}
          >
            Submit Trip Details
          </button>
        </div>
      )}
    </div>
  );
};

export default BidCard;
