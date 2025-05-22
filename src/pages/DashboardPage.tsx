import React, { useState ,useEffect} from 'react';
import { rides as mockRides } from '@/data/mockData';
import RideCard from '@/components/rides/RideCard';
import BottomNavigation from '@/components/common/BottomNavigation';
import { toast } from '@/hooks/use-toast';
import { Search, Car, Clock, DollarSign, Star, BarChart2, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios'
import { getDashboardDataDriver, placeBidService } from '../urls/urls';

// Mock statistics data (in a real app, this would come from an API)
const mockStats = {
  ongoingRides: 3,
  totalRides: 42,
  totalBids: 28,
  averageRating: 4.7,
  recentEarnings: [120, 85, 200, 150, 180, 220, 190]
};

const DashboardPage = () => {
  const[dashboardData, dashboardDataError, dashboardDataLoading, dashboardDataSubmit] = useAxios()
  const[bidSubmitData, bidSubmitError, bidSubmitLoading, bidSubmitSubmit] = useAxios()
const[fetchDashboardData,setFetchDashboardData] = useState(true)
  const [rides, setRides] = useState(mockRides);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleBidSubmit = (booking_id: string, amount: number) => {
    bidSubmitSubmit(placeBidService({booking_id:booking_id, bid_amount:amount}))

  };
  useEffect(()=>{
    if(bidSubmitData && bidSubmitData?.result === 'success'){
      toast({
        title: "Bid Placed",
        description: `Your bid has been submitted.`,
      });
      setFetchDashboardData(true)
    } 
  },[bidSubmitData])
  useEffect(()=>{
   
    if(bidSubmitError && bidSubmitError?.response?.data?.result === 'failure'){
      toast({
        title: "Error",
        description: bidSubmitError?.response?.data?.error,
        variant: "destructive",
      });
    }
  },[bidSubmitError])
  const handleRideClick = (booking_id: string) => {
    navigate(`/rides/${booking_id}`);
  };
  
  const filteredRides = rides.filter(ride => 
    ride.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(()=>{
    if(fetchDashboardData){
    dashboardDataSubmit(getDashboardDataDriver())
    setFetchDashboardData(false)
    }
  },[fetchDashboardData])

  useEffect(()=>{
    if(dashboardDataError){
   toast({
    title: "Error",
    description: dashboardDataError?.response?.data?.error?
    dashboardDataError?.response?.data?.error
    :"Dashboard data not found",
    variant: "destructive",
   })
  }
  },[dashboardDataError])

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">A</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Stats Cards */}
        <section className="grid grid-cols-2 gap-4">
          {/* Ongoing Rides */}
          <div
            className="bg-card rounded-2xl p-6 border border-border shadow-md flex flex-col items-center cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate('/ongoing-rides',{state:{ongoing_rides:dashboardData?.ongoing_rides}})}
          >
            <Car className="h-12 w-12 text-primary mb-3" />
            <h3 className="font-semibold text-center mb-1">Ongoing Rides</h3>
            <p className="text-2xl font-bold text-center">{dashboardData?.ongoing_rides ? dashboardData?.ongoing_rides.length : '0'}</p>
          </div>

          {/* Total Rides */}
          <div
            className="bg-card rounded-2xl p-6 border border-border shadow-md flex flex-col items-center cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate('/total-rides',{state:{total_rides:dashboardData?.total_rides}})}
          >
            <Clock className="h-12 w-12 text-primary mb-3" />
            <h3 className="font-semibold text-center mb-1">Total Rides</h3>
            <p className="text-2xl font-bold text-center">{dashboardData?.total_rides ? dashboardData?.total_rides.length : '0'}</p>
          </div>

          {/* Total Bids */}
          <div
            className="bg-card rounded-2xl p-6 border border-border shadow-md flex flex-col items-center cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate('/total-bids',{state:{total_bids:dashboardData?.total_bids}})}
          >
            <IndianRupee className="h-12 w-12 text-primary mb-3" />
            <h3 className="font-semibold text-center mb-1">Total Bids</h3>
            <p className="text-2xl font-bold text-center">{dashboardData?.total_bids ? dashboardData?.total_bids.length : '0'}</p>
          </div>

          {/* Rating */}
          <div
            className="bg-card rounded-2xl p-6 border border-border shadow-md flex flex-col items-center cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate('/ratings',{state:{ratings:dashboardData?.ratings, average_rating:dashboardData?.average_rating, ratingDistribution:dashboardData?.ratingDistribution}})}
          >
            <Star className="h-12 w-12 text-primary mb-3" />
            <h3 className="font-semibold text-center mb-1">Rating</h3>
            <p className="text-2xl font-bold text-center">{dashboardData?.average_rating ? dashboardData?.average_rating : '0'}</p>
          </div>
        </section>
      </main>
      
      <BottomNavigation assigned_rides_number={dashboardData?.assigned_rides_number}/>
    </div>
  );
};

export default DashboardPage;
