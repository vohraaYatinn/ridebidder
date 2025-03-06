import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/common/BottomNavigation';

// Mock data (in a real app, this would come from an API)
const mockRatings = {
  averageRating: 4.7,
  totalRatings: 38,
  ratingDistribution: [0, 1, 3, 8, 26], // 1-star to 5-star counts
  recentReviews: [
    {
      id: 'review-001',
      passengerName: 'Jessica Williams',
      rating: 5,
      comment: 'Very professional driver. Car was clean and the ride was smooth.',
      date: '2023-11-15'
    },
    {
      id: 'review-002',
      passengerName: 'Thomas Anderson',
      rating: 5,
      comment: 'Excellent service! Arrived on time and got me to my destination quickly.',
      date: '2023-11-14'
    },
    {
      id: 'review-003',
      passengerName: 'Amanda Garcia',
      rating: 4,
      comment: 'Good driver, but took a slightly longer route than necessary.',
      date: '2023-11-13'
    },
    {
      id: 'review-004',
      passengerName: 'David Miller',
      rating: 5,
      comment: 'Very friendly and professional. Would ride again!',
      date: '2023-11-12'
    },
    {
      id: 'review-005',
      passengerName: 'Sophia Lee',
      rating: 3,
      comment: 'Decent ride but car could have been cleaner.',
      date: '2023-11-10'
    }
  ],
  badges: [
    { name: 'Punctual Driver', count: 32 },
    { name: 'Clean Car', count: 28 },
    { name: 'Excellent Service', count: 25 },
    { name: 'Safe Driver', count: 30 }
  ]
};

const RatingsPage = () => {
  const navigate = useNavigate();
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Render stars for a rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

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
            <Star className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Your Ratings</h1>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Rating Summary */}
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{mockRatings.averageRating}</h2>
              <div className="flex items-center mt-1">
                {renderStars(Math.round(mockRatings.averageRating))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({mockRatings.totalRatings} ratings)
                </span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="h-8 w-8 text-primary fill-primary" />
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2">
            {mockRatings.ratingDistribution.map((count, index) => {
              const starNumber = 5 - index;
              const percentage = (count / mockRatings.totalRatings) * 100;
              
              return (
                <div key={starNumber} className="flex items-center gap-2">
                  <span className="text-sm w-8">{starNumber} ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Badges */}
        <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Your Badges</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {mockRatings.badges.map((badge, index) => (
              <div key={index} className="border border-border rounded-lg p-3 flex flex-col items-center">
                <ThumbsUp className="h-6 w-6 text-primary mb-1" />
                <p className="text-sm font-medium text-center">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.count} times</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Reviews */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Recent Reviews</h2>
          </div>
          
          <div className="space-y-4">
            {mockRatings.recentReviews.map(review => (
              <div key={review.id} className="bg-card rounded-lg p-4 border border-border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{review.passengerName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    review.rating === 5 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.rating} ★
                  </span>
                </div>
                
                <div className="space-y-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-0.5 h-10 bg-border mx-auto my-1"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-xs text-muted-foreground">Comment</p>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">{formatDate(review.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default RatingsPage; 