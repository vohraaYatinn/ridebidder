
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Transaction } from '@/data/mockData';
import { ArrowDown, ArrowUp } from 'lucide-react';
import  moment  from 'moment';


const TransactionList = ({ transactions }) => {
  return (
    <Card variant="glass" className="w-full animate-scale-in" style={{
      marginTop:"0rem"
    }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-3">
          {transactions?.map((transaction) => (
            <div 
              key={transaction?.id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                 true 
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {/* {true ? (
                    <ArrowUp className="h-5 w-5" />
                  ) : (
                    <ArrowDown className="h-5 w-5" />
                  )} */}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{transaction?.is_admin? (transaction?.amount_received>0?'Admin Sended':transaction?.amount_to_pay?'Admin Collected':''): (`booking id: ${transaction?.booking}`)}</p>
                  <p className="text-xs text-muted-foreground">{moment(transaction?.timestamp).format('DD-MM-YYYY')}</p>
                </div>
              </div>
{              
       !transaction?.is_admin?
       <> <p className={'font-medium text-green-500'}>
       { '+' }₹{transaction?.amount_received}
  
     </p>
     <p className={'font-medium text-red-500'}>
    
       {'-'}₹{transaction?.amount_to_pay}
     </p></>:     <p className={'font-medium text-yellow-500'}>
    
    {}₹{transaction?.amount_to_pay>0?transaction?.amount_to_pay:transaction?.amount_received}
  </p>    }
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
