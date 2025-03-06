
import React from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import WalletCard from '@/components/wallet/WalletCard';
import TransactionList from '@/components/wallet/TransactionList';
import { userProfile, transactions } from '@/data/mockData';

const WalletPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <h1 className="text-2xl font-bold">Wallet</h1>
      </header>
      
      <main className="p-4 space-y-6">
        <WalletCard 
          balance={userProfile.walletBalance} 
          totalEarnings={userProfile.totalEarnings}
        />
        
        <TransactionList transactions={transactions} />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;
