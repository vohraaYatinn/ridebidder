
import React from 'react';
import { Card } from '../common/Card';
import { UserProfile } from '@/data/mockData';
import { Star, Mail, Phone, Car } from 'lucide-react';
import Button from '../common/Button';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <Card variant="glass" className="w-full overflow-hidden animate-scale-in">
      <div className="relative h-32 bg-gradient-to-r from-primary/50 to-blue-400/50">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full border-4 border-background overflow-hidden">
            <img 
              src={profile.profileImage} 
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-16 pb-6 px-5 text-center">
        <h2 className="text-xl font-bold">{profile.name}</h2>
        
        <div className="flex items-center justify-center mt-1 mb-3">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-sm font-medium">{profile.rating.toFixed(1)}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{profile.totalRides} Rides</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm truncate">{profile.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm">{profile.phone}</span>
          </div>
          <div className="flex items-center col-span-2">
            <Car className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm">
              {profile.vehicle.color} {profile.vehicle.model}, {profile.vehicle.year}
            </span>
          </div>
        </div>
        
        <Button className="mt-6 w-full">Edit Profile</Button>
      </div>
    </Card>
  );
};

export default ProfileHeader;
