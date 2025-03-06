import React from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ReviewList from '@/components/profile/ReviewList';
import { userProfile, reviews } from '@/data/mockData';
import Button from '@/components/common/Button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Simulate logout
    toast.success('Logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <ProfileHeader profile={userProfile} />
        
        <ReviewList reviews={reviews} />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
