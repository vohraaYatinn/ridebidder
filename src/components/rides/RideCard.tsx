import React, { useState } from 'react';
import { MapPin, Car, Clock } from 'lucide-react';
import moment from 'moment';

const RideCard = ({ ride, onBidSubmit, onClick }) => {
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  console.log(ride)

  const handleBid = (e) => {
    e.stopPropagation();
    setShowBidInput((prev) => !prev);
  };

  const handleBidSubmit = (e) => {
    e.stopPropagation();
    if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) return;
    onBidSubmit(ride.id, Number(bidAmount));
    setShowBidInput(false);
    setBidAmount('');
  };

  return (
    <div
      className="bg-white rounded-xl shadow border p-4 flex flex-col gap-3 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-semibold">{ride.pickup_location}</span>
            <span className="text-xs text-gray-400">-</span>
            <span className="font-semibold">{ride.drop_location}</span>
          </div>
        </div>
        <div className="bg-green-200 text-green-800 rounded-lg px-3 py-1 text-xs font-semibold text-right whitespace-nowrap">
          {ride.pickup_date && moment(ride.pickup_date).format('ddd, MMM DD, YYYY')}
          <br />
          {ride.pickup_date && moment(ride.pickup_date).format('hh:mm A')}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
        {ride.trip_km && (
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            {ride.trip_km} KM
          </div>
        )}
      

        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">

        {ride.trip_type && (
          <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 capitalize">
            {ride.trip_type.replace('_', ' ')}
          </span>
        )}
        {ride.trip_mode && (
          <span className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 capitalize">
            {ride.trip_mode}
          </span>
        )}
        {ride.payment_type && (
          <span className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 capitalize">
            {ride.payment_type}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        {ride.fare && (
          <span className="border border-primary text-primary rounded-full px-3 py-1 text-xs">
            Fare: ₹{ride.fare}
          </span>
        )}
        {ride.toll_amount > 0 && (
          <span className="border border-blue-500 text-blue-700 rounded-full px-3 py-1 text-xs">
            Toll: ₹{ride.toll_amount}
          </span>
        )}
        {ride.extra_fare > 0 && (
          <span className="border border-red-500 text-red-700 rounded-full px-3 py-1 text-xs">
            Extra: ₹{ride.extra_fare}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold flex-1"
          onClick={handleBid}
        >
          BID
        </button>
      </div>
      {showBidInput && (
        <div className="flex gap-2 mt-2 items-center">
          <input
            type="number"
            value={bidAmount}
            onChange={e => setBidAmount(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-gray-50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter bid amount"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold"
            onClick={handleBidSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default RideCard;
