
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Review } from '@/data/mockData';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <Card variant="glass" className="w-full animate-scale-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Reviews</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="p-3 rounded-lg border border-border/30 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start mb-2">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={review.passengerImage} 
                    alt={review.passengerName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{review.passengerName}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="ml-auto">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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

export default ReviewList;
