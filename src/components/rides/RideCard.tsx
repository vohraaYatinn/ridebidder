import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { Ride } from '@/data/mockData';
import { Clock, MapPin, User, Navigation, DollarSign, IndianRupee } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import moment from "moment";


const RideCard = ({ride, onBidSubmit, onClick }) => {
  const [bidAmount, setBidAmount] = useState('0');
  const [showBidForm, setShowBidForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Badge variant="success">Open</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="info">In Progress</Badge>;
      case 'COMPLETED':
        return <Badge variant="secondary">Completed</Badge>;
      case 'CANCELLED':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid bid amount",
        variant: "destructive",
      });
      return;
    }
    else{
      onBidSubmit(ride.id, Number(bidAmount));
    }
    // setIsSubmitting(true);
    
    // // Simulate API call
    // setTimeout(() => {
    //   if (onBidSubmit) {
    //     onBidSubmit(ride.id, Number(bidAmount));
    //   }
    //   toast({
    //     title: "Success",
    //     description: `Bid of $${bidAmount} placed successfully`,
    //     variant: "default",
    //   });
    //   setShowBidForm(false);
    //   setIsSubmitting(false);
    //   setBidAmount(ride.basePrice.toString());
    // }, 1000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If we're clicking on a button or input inside the card, don't navigate
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLInputElement ||
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('input')
    ) {
      e.stopPropagation();
      return;
    }
    
    if (onClick) {
      onClick();
    } else {
      navigate(`/rides/${ride.id}`);
    }
  };

  return (
    <div 
      className="bg-card rounded-lg p-4 border border-border shadow-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <Card variant="glass" className="w-full overflow-hidden animate-scale-in">
        <CardHeader className="pb-2 border-b border-border/20">
          <div className="flex justify-between items-start">
            <CardTitle>{ moment(ride.pickup_date).format("MMMM D, YYYY h:mm A")} </CardTitle>
            {getStatusBadge(ride.status)}
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Pickup</p>
                <p className="text-sm text-muted-foreground">{ride.pickup_location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Navigation className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Dropoff</p>
                <p className="text-sm text-muted-foreground">{ride.drop_location}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-400" />
              <span className="text-sm">{ride.estimatedDuration}</span>
            </div> */}
            {/* <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-blue-400" />
              <div className="flex items-center">
                <span className="text-sm mr-1">{ride.passengerRating}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              </div>
            </div> */}
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-blue-400" />
              <span className="text-sm">{ride.trip_km}</span>
            </div>
            <div className="flex items-center">
              <IndianRupee className="mr-2 h-4 w-4 text-blue-400" />
              <span className="text-sm">${ride.trip_type}</span>
            </div>
          </div>
          
          {showBidForm && (
            <div className="pt-3 space-y-3 border-t border-border/20 animate-fade-in">
              <label className="text-sm">Your Bid Amount ($)</label>
              <div className="flex space-x-2">
                <input 
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter bid amount"
                />
                <Button size="sm" onClick={handleBidSubmit} isLoading={isSubmitting}>
                  Submit
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          {!showBidForm ? (
            <Button 
              className="w-full"
              variant="default"
              onClick={() => setShowBidForm(true)}
            >
              Place Bid
            </Button>
          ) : (
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => setShowBidForm(false)}
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

// Star component for rating
const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default RideCard;
