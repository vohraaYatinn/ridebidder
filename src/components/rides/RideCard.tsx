import React, { useState } from 'react';
import { Car, Clock, IndianRupee, ArrowRightLeft } from 'lucide-react';
import moment from 'moment';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RideCard = ({ ride, onBidSubmit, onClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const cabCategoryName = ride.cab?.category?.category_name || 'Cab';
  const extraKmRate = ride.cab?.extra_rate_per_km || '0.00';

  const handleBid = (e) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) return;
    onBidSubmit(ride.id, Number(bidAmount));
    setIsDialogOpen(false);
    setBidAmount('');
  };

  return (
    <>
      <div
        className="bg-white rounded-2xl shadow border p-0 flex flex-col cursor-pointer hover:shadow-lg transition overflow-hidden"
        onClick={onClick}
        style={{ maxWidth: 400, margin: 'auto' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 pt-4">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            {ride.trip_mode ? ride.trip_mode.replace('_', ' ').toUpperCase() : ''}
            {ride.trip_type ? ' - ' + ride.trip_type.replace('_', ' ').toUpperCase() : ''}
          </span>
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-semibold">
            Paid by {ride.payment_type || 'Cash'}
          </span>
        </div>
        {/* Pickup Address */}
        <div className="px-4 pt-2 pb-2">
          <div className="text-xs text-gray-500 font-medium mb-1">Pickup :</div>
          <div className="font-bold text-gray-800 leading-tight text-base">
            {ride.pickup_location}
          </div>
        </div>
        <div className="border-t border-dashed border-gray-200 my-2" />
        {/* Main Info Grid */}
        <div className="grid grid-cols-3 text-center px-2 py-2">
          <div className="flex flex-col items-center justify-center">
            <IndianRupee className="h-6 w-6 text-green-600 mb-1" />
            <div className="font-bold text-lg text-green-700">Rs {ride.fare}</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Car className="h-6 w-6 text-yellow-600 mb-1" />
            <div className="font-bold text-base text-gray-700 text-center">{cabCategoryName}</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ArrowRightLeft className="h-6 w-6 text-gray-500 mb-1" />
            <div className="font-bold text-base text-gray-700">{ride.trip_km} km</div>
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
            {ride.pickup_date ? moment(ride.pickup_date).format('MMM DD, YYYY hh:mm A') : ''}
          </div>
        </div>
        {/* Bid Button */}
        <div className="flex gap-2 mt-2 px-4 pb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold flex-1"
            onClick={handleBid}
          >
            BID
          </button>
        </div>
      </div>

      {/* Bid Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place Your Bid</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="bidAmount" className="block text-sm font-medium mb-1">
                  Your Bid Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <Input
                    id="bidAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
             
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBidSubmit}
              disabled={!bidAmount || parseFloat(bidAmount) <= 0}
            >
              Submit Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RideCard;

