import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Car, MapPin, Navigation, IndianRupee, Calendar, Camera, Gauge, CarTaxiFront } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';
import moment from "moment";
import useAxios from '@/hooks/useAxios';
import { endTrip, collectPayment } from '@/urls/urls';
import Modal from '@/components/common/Modal';
import { toast } from '@/hooks/use-toast';

const OngoingRidesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ongoing_rides } = location.state || {};
  
  // Debug logs
  console.log("Raw ongoing_rides:", ongoing_rides);
  console.log("Type of ongoing_rides:", typeof ongoing_rides);
  console.log("Is Array?", Array.isArray(ongoing_rides));
  
  // Flatten the nested array if needed
  const flattenedRides = Array.isArray(ongoing_rides) ? ongoing_rides.flat() : [];
  console.log("Flattened rides:", flattenedRides);
  
  const [tripResponse, tripError, tripLoading, tripSubmit] = useAxios();
  const [collectResponse, collectError, collectLoading, collectSubmit] = useAxios();
  const [endingRideId, setEndingRideId] = useState(null);
  const [meterImage, setMeterImage] = useState(null);
  const [currentKm, setCurrentKm] = useState('');
  const [tollAmount, setTollAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [extraFare, setExtraFare] = useState(0);
  const [PendingFare, setPendingFare] = useState(0);
  const [booking_id, setbooking_id] = useState(null);

  const handleImageChange = (e) => {
    setMeterImage(e.target.files[0]);
  };

  const handleEndTrip = async (rideId) => {
    if (!meterImage || !currentKm) {
      toast({
        title: "Trip Ended",
        description: "Please upload meter image and enter KM.",
        variant: "destructive",
      });
      return;
    }

    setbooking_id(rideId);
    tripSubmit(endTrip({
      end_trip_image: meterImage,
      end_km: currentKm,
      booking_id: rideId,
      toll_amount: tollAmount
    }));
  };

  useEffect(() => {
    if (tripResponse?.isExtra) {
      setMeterImage(null);
      setCurrentKm('');
      setEndingRideId(null);
      setExtraFare(tripResponse.extraFare);
      setPendingFare(tripResponse.pending_amount);
      setShowModal(true);
    }
    else if (!tripResponse?.isExtra && tripResponse?.['message'] == 'success') {
      setMeterImage(null);
      setCurrentKm('');
      setEndingRideId(null);
      navigate('/dashboard');
      toast({
        title: "Trip Ended",
        description: "Trip Ended Successfully.",
        variant: "default",
      });
    }
    else if (tripResponse?.['error']) {
      toast({
        title: "Trip Ended",
        description: tripResponse?.['error'],
        variant: "destructive",
      });
    }
  }, [tripResponse]);

  const handleCollect = () => {
    collectSubmit(collectPayment({ booking_id: booking_id }));
    setShowModal(false);
  };

  useEffect(() => {
    if (collectResponse && collectResponse?.['message'] == 'success') {
      toast({
        title: "Payment Collected",
        description: "Success.",
        variant: "default",
      });
      navigate('/dashboard');
    }
  }, [collectResponse]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Ongoing Rides</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">Currently Active</p>
          <p className="text-2xl font-bold">{flattenedRides?.length} Rides</p>
        </div>

        <div className="space-y-4">
          {flattenedRides?.map((ride) => (
            <div key={ride.id} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{ride?.user?.first_name}</h3>
                    <p className="text-sm text-muted-foreground">{ride?.user?.phone_number}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ride.status === 'ongoing'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ride?.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">{ride?.pickup_location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Navigation className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">Dropoff</p>
                      <p className="text-sm text-muted-foreground">{ride?.drop_location}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Started at</p>
                    <p className="text-sm font-medium">{moment(ride?.pickup_date).format("MMMM D, YYYY h:mm A")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Trip Type</p>
                    <p className="text-sm font-medium capitalize">{ride?.trip_type}</p>
                  </div>
                </div>

                {ride.status === 'ongoing' && (
                  <>
                    {endingRideId === ride.id ? (
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
                            onChange={handleImageChange}
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
                        <div className="flex items-center gap-2">
                          <CarTaxiFront className="h-4 w-4 text-muted-foreground" />
                          <label htmlFor="tollAmount" className="text-sm font-medium">
                            Toll Collected
                          </label>
                          <input
                            id="tollAmount"
                            type="number"
                            value={tollAmount}
                            onChange={(e) => setTollAmount(e.target.value)}
                            placeholder="e.g.₹300"
                            className="border px-3 py-1 rounded-md text-sm w-full"
                          />
                        </div>

                        <Button 
                          disabled={tripLoading} 
                          onClick={() => handleEndTrip(ride.id)} 
                          className="w-full" 
                          variant="default"
                        >
                          Submit Trip Details
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="default" 
                        className="w-full" 
                        onClick={() => setEndingRideId(ride.id)}
                      >
                        End Trip
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <Modal title="Extra KM Travelled" onClose={() => setShowModal(false)}>
          <p className="text-sm mb-4">
            Extra fare of ₹{extraFare} and Pending Amount of ₹{PendingFare}. Please collect ₹{extraFare + PendingFare} from the customer.
          </p>
          <Button disabled={collectLoading} className="w-full" onClick={handleCollect}>
            Collect
          </Button>
        </Modal>
      )}

      <BottomNavigation />
    </div>
  );
};

export default OngoingRidesPage;
