
import React, { useEffect } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import WalletCard from '@/components/wallet/WalletCard';
import TransactionList from '@/components/wallet/TransactionList';
import { userProfile, transactions } from '@/data/mockData';
import useAxios from '../hooks/useAxios'
import { getWalletDataDriver } from '../urls/urls';
import { toast } from '@/hooks/use-toast';

const WalletPage = () => {
  const[walletData,walletDataError,walletDataLoading,walletDataSubmit] = useAxios()  
  useEffect(() => {
    walletDataSubmit(getWalletDataDriver());
  }, []);
    
  useEffect(() => {
    if (walletDataError && walletDataError.response.status === 500) {
      toast({
        title: 'Error',
        description: 'Failed to fetch wallet data',
        variant: 'destructive', 
      });
    }
  }, [walletDataError]);
  
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
        <h1 className="text-2xl font-bold">Wallet</h1>
      </header>
      
      <main className="p-4 space-y-6">
        <WalletCard 
          balance={walletData?.amount_give} 
          totalEarnings={walletData?.amount_recieve}
        />
        
        <TransactionList transactions={walletData?.payments} />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;
