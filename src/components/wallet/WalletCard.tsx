
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { ArrowDown, ArrowUp, CreditCard } from 'lucide-react';
import Button from '../common/Button';

interface WalletCardProps {
  balance: number;
  totalEarnings: number;
}

const WalletCard = ({ balance, totalEarnings }: WalletCardProps) => {
  return (
    <Card variant="glass" className="w-full animate-scale-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Wallet</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="p-4 bg-primary/10 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-green-500">Total Earning ₹{totalEarnings}</p>
              <p className="text-2xl font-bold text-red-500">Total To Pay ₹{balance}</p>
            </div>
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <div className="flex items-center mb-1">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-xs text-green-500">Income</p>
            </div>
            <p className="text-lg font-semibold">${totalEarnings}</p>
          </div>
          
          <div className="p-3 bg-red-500/10 rounded-lg">
            <div className="flex items-center mb-1">
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              <p className="text-xs text-red-500">Paid Out</p>
            </div>
            <p className="text-lg font-semibold">${(totalEarnings - balance)}</p>
          </div>
        </div>
        
        <Button className="w-full">Add Funds</Button> */}
      </CardContent>
    </Card>
  );
};

export default WalletCard;
