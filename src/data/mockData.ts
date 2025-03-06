
// Mock data for the rides app

// Ride statuses
export type RideStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

// Bid statuses
export type BidStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// Transaction types
export type TransactionType = 'CREDIT' | 'DEBIT';

// Ride interface
export interface Ride {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
  pickupDate: string;
  estimatedDistance: string;
  estimatedDuration: string;
  passengerName: string;
  passengerRating: number;
  status: RideStatus;
  basePrice: number;
}

// Bid interface
export interface Bid {
  id: string;
  rideId: string;
  amount: number;
  status: BidStatus;
  createdAt: string;
  ride: Ride;
}

// Transaction interface
export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  rideId?: string;
}

// User profile interface
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  vehicle: {
    model: string;
    color: string;
    year: string;
    licensePlate: string;
  };
  rating: number;
  totalRides: number;
  totalEarnings: number;
  walletBalance: number;
}

// Review interface
export interface Review {
  id: string;
  passengerName: string;
  passengerImage: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock rides data
export const rides: Ride[] = [
  {
    id: '1',
    pickupLocation: '123 Main St, New York',
    dropLocation: '456 Broadway, New York',
    pickupTime: '14:30',
    pickupDate: '2023-09-15',
    estimatedDistance: '5.2 miles',
    estimatedDuration: '25 mins',
    passengerName: 'John Doe',
    passengerRating: 4.8,
    status: 'OPEN',
    basePrice: 25,
  },
  {
    id: '2',
    pickupLocation: '789 Park Ave, New York',
    dropLocation: '101 5th Ave, New York',
    pickupTime: '16:45',
    pickupDate: '2023-09-15',
    estimatedDistance: '3.7 miles',
    estimatedDuration: '18 mins',
    passengerName: 'Sarah Johnson',
    passengerRating: 4.5,
    status: 'OPEN',
    basePrice: 18,
  },
  {
    id: '3',
    pickupLocation: '555 Madison Ave, New York',
    dropLocation: '777 Lexington Ave, New York',
    pickupTime: '09:15',
    pickupDate: '2023-09-16',
    estimatedDistance: '2.3 miles',
    estimatedDuration: '12 mins',
    passengerName: 'Mike Williams',
    passengerRating: 4.9,
    status: 'OPEN',
    basePrice: 14,
  },
  {
    id: '4',
    pickupLocation: '888 6th Ave, New York',
    dropLocation: '999 7th Ave, New York',
    pickupTime: '19:30',
    pickupDate: '2023-09-16',
    estimatedDistance: '1.8 miles',
    estimatedDuration: '10 mins',
    passengerName: 'Emily Clark',
    passengerRating: 4.7,
    status: 'OPEN',
    basePrice: 12,
  },
  {
    id: '5',
    pickupLocation: '222 8th Ave, New York',
    dropLocation: '333 9th Ave, New York',
    pickupTime: '11:00',
    pickupDate: '2023-09-17',
    estimatedDistance: '4.1 miles',
    estimatedDuration: '22 mins',
    passengerName: 'David Brown',
    passengerRating: 4.6,
    status: 'OPEN',
    basePrice: 22,
  },
];

// Mock bids data
export const bids: Bid[] = [
  {
    id: '1',
    rideId: '2',
    amount: 20,
    status: 'ACCEPTED',
    createdAt: '2023-09-14T14:30:00',
    ride: rides[1],
  },
  {
    id: '2',
    rideId: '3',
    amount: 15,
    status: 'PENDING',
    createdAt: '2023-09-15T09:45:00',
    ride: rides[2],
  },
  {
    id: '3',
    rideId: '4',
    amount: 13,
    status: 'REJECTED',
    createdAt: '2023-09-15T18:15:00',
    ride: rides[3],
  },
];

// Mock transactions data
export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 20,
    type: 'CREDIT',
    description: 'Completed ride with Sarah Johnson',
    date: '2023-09-14',
    rideId: '2',
  },
  {
    id: '2',
    amount: 15,
    type: 'DEBIT',
    description: 'Cash payment to wallet',
    date: '2023-09-13',
    rideId: '3',
  },
  {
    id: '3',
    amount: 30,
    type: 'CREDIT',
    description: 'Bonus for 5-star rating',
    date: '2023-09-12',
  },
  {
    id: '4',
    amount: 25,
    type: 'CREDIT',
    description: 'Completed ride with John Doe',
    date: '2023-09-10',
    rideId: '1',
  },
  {
    id: '5',
    amount: 10,
    type: 'DEBIT',
    description: 'Cash payment to wallet',
    date: '2023-09-08',
    rideId: '4',
  },
];

// Mock user profile data
export const userProfile: UserProfile = {
  id: '123',
  name: 'Alex Driver',
  email: 'alex.driver@example.com',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://i.pravatar.cc/300',
  vehicle: {
    model: 'Toyota Camry',
    color: 'Black',
    year: '2020',
    licensePlate: 'NYC-2023',
  },
  rating: 4.85,
  totalRides: 128,
  totalEarnings: 3245.50,
  walletBalance: 450.75,
};

// Mock reviews data
export const reviews: Review[] = [
  {
    id: '1',
    passengerName: 'John Doe',
    passengerImage: 'https://i.pravatar.cc/100?img=1',
    rating: 5,
    comment: 'Excellent driver, very professional and punctual.',
    date: '2023-09-14',
  },
  {
    id: '2',
    passengerName: 'Sarah Johnson',
    passengerImage: 'https://i.pravatar.cc/100?img=2',
    rating: 5,
    comment: 'Great experience! Car was clean and driver was friendly.',
    date: '2023-09-12',
  },
  {
    id: '3',
    passengerName: 'Mike Williams',
    passengerImage: 'https://i.pravatar.cc/100?img=3',
    rating: 4,
    comment: 'Good ride, but took a slightly longer route.',
    date: '2023-09-10',
  },
  {
    id: '4',
    passengerName: 'Emily Clark',
    passengerImage: 'https://i.pravatar.cc/100?img=4',
    rating: 5,
    comment: 'Amazing service! Would ride with this driver again.',
    date: '2023-09-08',
  },
];
