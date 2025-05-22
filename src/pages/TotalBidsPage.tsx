import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CheckCircle, XCircle, Clock, IndianRupee, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/common/BottomNavigation';
import { useLocation } from "react-router-dom";
import { editBidService } from '../urls/urls';
import useAxios from '../hooks/useAxios';
import { toast } from '@/hooks/use-toast';

// Mock data (in a real app, this would come from an API)

const TotalBidsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total_bids } = location.state || {}
  console.log("total",total_bids)
  const [activeTab, setActiveTab] = useState('pending');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [editBidData, editBidError, editBidLoading, editBidSubmit] = useAxios();
  const [fetch, setFetch] = useState(false);
  
  const filteredBids = total_bids?total_bids?.filter(bid => bid.status.toLowerCase() === activeTab):[];
  console.log("total_bids",filteredBids);
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleEditClick = (bid) => {
    setSelectedBid(bid);
    setEditedAmount(bid.bid_amount.toString());
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedBid || !editedAmount) return;
    
    editBidSubmit(editBidService({
      bid_id: selectedBid.id,
      bid_amount: parseFloat(editedAmount)
    }));
  };

  // Show toast on edit success
  React.useEffect(() => {
    if (editBidData && editBidData?.result === 'success') {
      toast({
        title: 'Bid Updated',
        description: 'Your bid amount has been updated successfully.',
      });
      setIsEditDialogOpen(false);
      setSelectedBid(null);
      setEditedAmount('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  }, [editBidData]);

  // Show toast on edit error
  React.useEffect(() => {
    if (editBidError && editBidError?.response?.data?.result === 'failure') {
      toast({
        title: 'Error',
        description: editBidError?.response?.data?.error || 'Failed to update bid amount',
        variant: 'destructive',
      });
    }
  }, [editBidError]);

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
            <IndianRupee className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Your Bids</h1>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Bids</p>
          <p className="text-2xl font-bold">{total_bids?.length}</p>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
          <div>
              <p className="text-yellow-500 font-medium">
                {total_bids?.filter(bid => bid.status === 'pending').length}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div>
              <p className="text-green-500 font-medium">
                {total_bids?.filter(bid => bid.status === 'accepted').length}
              </p>
              <p className="text-xs text-muted-foreground">Accepted</p>
            </div>

            <div>
              <p className="text-red-500 font-medium">
                {total_bids?.filter(bid => bid.status === 'rejected').length}
              </p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4 mt-2">
            {filteredBids && filteredBids?.length > 0 ? (
              filteredBids.map((bid:any) => (
                <div 
                  key={bid.id} 
                  className="bg-card rounded-lg p-4 border border-border shadow-sm cursor-pointer"
                >
                  {/* Top Row: Trip Type & Payment */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {bid?.booking?.trip_type ? bid.booking.trip_type.replace('_', ' ').toUpperCase() + ' TRIP' : 'TRIP'}
                    </span>
                    <span className="bg-muted text-xs px-2 py-1 rounded-full font-medium border border-border">
                      {bid?.booking?.payment_type ? `Paid by ${bid.booking.payment_type}` : 'Paid'}
                    </span>
                  </div>

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
                        <ArrowLeft className="h-4 w-4 rotate-90" />
                        {bid?.booking?.trip_km} KM
                      </p>
                      <span className="text-xs text-muted-foreground">Est. Distance</span>
                    </div>
                  </div>

                  {/* Departure Date/Time */}
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Departure:</span>
                    <span className="text-xs font-medium">
                      {bid?.booking?.pickup_date ? new Date(bid.booking.pickup_date).toLocaleString() : '--'}
                    </span>
                  </div>

                  {/* Edit Button for Pending Bids */}
                  {bid.status.toLowerCase() === 'pending' && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(bid)}
                        className="flex items-center gap-1"
                        disabled={editBidLoading}
                      >
                        <Edit2 className="h-4 w-4" />
                        {editBidLoading ? 'Updating...' : 'Edit Bid'}
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No bids found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Bid Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bid Amount</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">New Bid Amount</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <IndianRupee className="h-4 w-4" />
                  </span>
                  <Input
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                    className="pl-8"
                    placeholder="Enter new bid amount"
                    disabled={editBidLoading}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              disabled={editBidLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              disabled={editBidLoading || !editedAmount}
            >
              {editBidLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
};

export default TotalBidsPage; 