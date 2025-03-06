import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { Bid } from '@/data/mockData';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { MapPin, Navigation, DollarSign, Calendar, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BidCardProps {
  bid: Bid;
  onCancel?: (bidId: string) => void;
}

const BidCard = ({ bid, onCancel }: BidCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getBadgeVariant = () => {
    switch (bid.status) {
      case 'PENDING':
        return 'warning';
      case 'ACCEPTED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      case 'CANCELLED':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleCancel = () => {
    if (bid.status !== 'PENDING') return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onCancel) {
        onCancel(bid.id);
      }
      toast({
        title: "Success",
        description: "Bid cancelled successfully",
        variant: "default",
      });
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card variant="glass" className="w-full animate-scale-in">
      <CardHeader className="pb-2 border-b border-border/20">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{bid.ride.pickupTime} - {bid.ride.pickupDate}</CardTitle>
          <Badge variant={getBadgeVariant()}>
            {bid.status.charAt(0) + bid.status.slice(1).toLowerCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start">
            <MapPin className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Pickup</p>
              <p className="text-sm text-muted-foreground">{bid.ride.pickupLocation}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Navigation className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Dropoff</p>
              <p className="text-sm text-muted-foreground">{bid.ride.dropLocation}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">${bid.amount}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-blue-400" />
            <span className="text-sm">{formatDate(bid.createdAt).split(',')[0]}</span>
          </div>
        </div>
      </CardContent>
      
      {bid.status === 'PENDING' && (
        <CardFooter>
          <Button 
            className="w-full"
            variant="destructive"
            onClick={handleCancel}
            isLoading={isLoading}
          >
            Cancel Bid
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BidCard;
