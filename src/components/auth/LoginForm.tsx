
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { toast } from '@/hooks/use-toast';
import { Phone, MessageSquare } from 'lucide-react';
import { sendOtpService,verifyOtpService } from '@/urls/urls';
import useAxios from '@/hooks/useAxios';

const LoginForm = () => {
  const[otpResponse, otpError, otpLoading,otpSubmit] = useAxios()
  const[otpVerifyResponse, otpVerifyError, otpVerifyLoading,otpVerifySubmit] = useAxios()
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phoneNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    else if (phoneNumber.length===10){
      sendOtp()
    }
    

  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length < 4) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }
    else if (otp.length===4){
      verifyOtp()
    }
  };
  useEffect(()=>{
    if(otpResponse.result==='success'){
      setShowOtpInput(true);
      console.log(otpResponse)
      setVerificationCode(otpResponse?.data?.data?.verificationId)
      toast({
        title: "Success",
        description: `OTP sent to ${phoneNumber}`,
        variant: "default",
      });
    }

  },[otpResponse])

useEffect(()=>{
  if(otpError?.status){
    toast({
      title: "Error",
      description:otpError?.response?.data?.error?
      otpError?.response?.data?.error :`OTP not sent to ${phoneNumber}`,
      variant: "destructive",
    });
  }

},[otpError])

useEffect(()=>{
  if(otpVerifyResponse.result==='success'){
    const token = otpVerifyResponse['access'];
    localStorage.setItem("token", token);
    navigate('/dashboard')
    toast({
      title: "Success",
      description: `Login Successfully`,
      variant: "default",
    });
  }

},[otpVerifyResponse])

useEffect(()=>{
  if(otpVerifyError?.status){
    toast({
      title: "Error",
      description: `Invalid OTP`,
      variant: "destructive",
    });
  }

},[otpVerifyError])

const sendOtp = ()=>{
  otpSubmit(sendOtpService({'phone':phoneNumber, "screen_type":"login",'role':'driver'}))
}

const verifyOtp = ()=>{
  otpVerifySubmit(verifyOtpService({'otp':otp,'phone':phoneNumber,"verification_code": verificationCode}))
}
  return (
    <div className="space-y-4 w-full max-w-sm">
      {!showOtpInput ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
            isLoading={otpLoading}
          >
            Send OTP
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-primary hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 4-digit OTP"
              maxLength={4}
              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary tracking-widest text-center text-lg"
              required
            />
            <p className="text-xs text-muted-foreground text-center">
              OTP sent to {phoneNumber}
              <button 
                type="button" 
                onClick={() => setShowOtpInput(false)}
                className="text-primary hover:underline ml-2"
              >
                Change
              </button>
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
            isLoading={otpVerifyLoading}
          >
            Verify & Login
          </Button>
          
          <button 
            type="button" 
            onClick={handleSendOtp}
            className="w-full text-sm text-primary hover:underline"
          >
            Resend OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
