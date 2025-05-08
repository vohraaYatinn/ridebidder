
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { toast } from '@/hooks/use-toast';
import { User, Phone, Upload, Car, Check, MessageSquare } from 'lucide-react';
import useAxios from '@/hooks/useAxios'
import { sendOtpService,verifyOtpService,signupDriverService } from '@/urls/urls'

const SignupForm = () => {
  const[otpResponse, otpError, otpLoading,otpSubmit] = useAxios()
  const[otpVerifyResponse, otpVerifyError, otpVerifyLoading,otpVerifySubmit] = useAxios()
  const[signupDriverResponse, signupDriverError, signupDriverLoading,signupDriverSubmit] = useAxios()

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Basic Info, 2: OTP Verification, 3: Document Upload
  
  // Basic Info
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [vehicleType, setVehicleType] = useState('car');
  // const [vehicleModel, setVehicleModel] = useState('');
  // const [vehicleYear, setVehicleYear] = useState('');
  
  // OTP Verification
  const [otp, setOtp] = useState('');
  
  // Document Upload
    const [verificationCode, setVerificationCode] = useState("");
  
  const [driverLicense, setDriverLicense] = useState<File | null>(null);
  const [AddharCard, setAddharCard] = useState<File | null>(null);
  const [AddharCardNumber, setAddharCardNumber] = useState('')
  const [driverLicenseNumber, setdriverLicenseNumber] = useState('')
  const [insuranceDoc, setInsuranceDoc] = useState<File | null>(null);
  const sendOtp = ()=>{

    otpSubmit(sendOtpService({'phone':phoneNumber, "screen_type":"register"}))
  }

  const verifyOtp = ()=>{
    otpVerifySubmit(verifyOtpService({'otp':otp, 'phone':phoneNumber,"verification_code": verificationCode}))
  }
  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phoneNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    else if (phoneNumber.length === 10 && name){
      sendOtp()
    }
    

  };
    useEffect(()=>{
      if(otpResponse.result==='success'){
        setVerificationCode(otpResponse?.data?.data?.verificationId)

        setStep(2);
        toast({
          title: "Success",
          description: `OTP sent to ${phoneNumber}`,
          variant: "default",
        });
      }

    },[otpResponse])
  

  useEffect(()=>{
    if(otpError){
      toast({
        title: "Error",
        description: `OTP not sent to ${phoneNumber}`,
        variant: "destructive",
      });
    }

  },[otpError])

  useEffect(()=>{
    if(otpVerifyResponse.result==='success'){
      setStep(3);
      toast({
        title: "Success",
        description: `Phone Number Verified Successfully`,
        variant: "default",
      });
    }

  },[otpVerifyResponse])


useEffect(()=>{
 if(otpVerifyError){
  toast({
    title: "Error",
    description: `Invalid OTP`,
    variant: "destructive",
  });
 }

},[otpVerifyError])


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

  const handleDocumentUpload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(AddharCardNumber,driverLicenseNumber)
    if (!driverLicense || !AddharCard || !AddharCardNumber || !driverLicenseNumber) {
      toast({
        title: "Error",
        description: "Please upload all required documents",
        variant: "destructive",
      });
      return;
    }
    else if (driverLicense && AddharCard && AddharCardNumber && driverLicenseNumber){
      signupDriver()
    }

  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      console.log('from file change',e.target.files[0])
      setFile(e.target.files[0]);
    }
  };
  const signupDriver = ()=>{
    signupDriverSubmit(signupDriverService({'name':name,'phone_number':phoneNumber,'license_doc':driverLicense,'aadhaar_doc':AddharCard ,license_number:driverLicenseNumber,aadhaar_number:AddharCardNumber}))
  }
  useEffect(()=>{
    if(signupDriverResponse.result==='success'){
      navigate('/login')
      toast({
        title: "Success",
        description: "Driver signed up successfully",
        variant: "default",
      });
    }
  },[signupDriverResponse])

  useEffect(()=>{
   if(signupDriverError?.response?.data?.error){
    toast({
      title: "Error",
      description: signupDriverError?.response?.data?.error?
      signupDriverError?.response?.data?.error
      :"Driver signup failed",
      variant: "destructive",
    });
   }

  },[signupDriverError])

  const renderBasicInfoForm = () => (
    <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      
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
          placeholder="+1 (555) 123-4567"
          className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      
      {/* <div className="space-y-2">
        <label htmlFor="vehicleType" className="text-sm font-medium flex items-center gap-2">
          <Car className="h-4 w-4" />
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="car">Car</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
        </select>
      </div> */}
      
      {/* <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="vehicleModel" className="text-sm font-medium">
            Vehicle Model
          </label>
          <input
            id="vehicleModel"
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            placeholder="Toyota Camry"
            className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="vehicleYear" className="text-sm font-medium">
            Year
          </label>
          <input
            id="vehicleYear"
            type="text"
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value)}
            placeholder="2023"
            className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div> */}
      
      <Button
        type="submit"
        className="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
        isLoading={otpLoading}
      >
        Continue
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account?</span>{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-primary hover:underline font-medium"
        >
          Sign In
        </button>
      </div>
    </form>
  );

  const renderOtpVerificationForm = () => (
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
            onClick={() => setStep(1)}
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
        Verify
      </Button>
      
      <button 
        type="button" 
        onClick={handleBasicInfoSubmit}
        className="w-full text-sm text-primary hover:underline"
      >
        Resend OTP
      </button>
    </form>
  );

  const renderDocumentUploadForm = () => (
    <form onSubmit={handleDocumentUpload} className="space-y-4">
            <div className="space-y-2">
  <label htmlFor="AddharCard" className="text-sm font-medium flex items-center gap-2">
    <Upload className="h-4 w-4" />
    Driver's License Number
  </label>
  <input
    id="driverLicenseNumber"
    type="text"
    value={driverLicenseNumber}
    onChange={(e) => setdriverLicenseNumber(e.target.value)}
    placeholder="Enter your License number"
    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
  />
</div>
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Driver's License
        </label>
        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${driverLicense ? 'border-green-500' : 'border-border'}`}>
          {driverLicense ? (
            <div className="flex items-center justify-center gap-2 text-green-500">
              <Check className="h-4 w-4" />
              <span>{driverLicense.name}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Upload your driver's license</p>
              <label htmlFor="driverLicense" className="cursor-pointer px-4 py-2 bg-secondary text-foreground rounded-lg inline-block text-sm hover:bg-secondary/80 transition-colors">
                Choose File
              </label>
            </div>
          )}
          <input
            id="driverLicense"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, setDriverLicense)}
            className="hidden"
          />
        </div>
      </div>
      <div className="space-y-2">
  <label htmlFor="AddharCard" className="text-sm font-medium flex items-center gap-2">
    <Upload className="h-4 w-4" />
    AadharCard Number
  </label>
  <input
    id="AddharCardNumber"
    type="number"
    value={AddharCardNumber}
    onChange={(e) => setAddharCardNumber(e.target.value)}
    placeholder="Enter your Aadhar number"
    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
  />
</div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Upload className="h-4 w-4" />
          AddharCard
        </label>
        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${AddharCard ? 'border-green-500' : 'border-border'}`}>
          {AddharCard ? (
            <div className="flex items-center justify-center gap-2 text-green-500">
              <Check className="h-4 w-4" />
              <span>{AddharCard.name}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Upload your AddharCard</p>
              <label htmlFor="AddharCard" className="cursor-pointer px-4 py-2 bg-secondary text-foreground rounded-lg inline-block text-sm hover:bg-secondary/80 transition-colors">
                Choose File
              </label>
            </div>
          )}
          <input
            id="AddharCard"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, setAddharCard)}
            className="hidden"
          />
        </div>
      </div>
      
      {/* <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Insurance Document
        </label>
        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${insuranceDoc ? 'border-green-500' : 'border-border'}`}>
          {insuranceDoc ? (
            <div className="flex items-center justify-center gap-2 text-green-500">
              <Check className="h-4 w-4" />
              <span>{insuranceDoc.name}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Upload your insurance document</p>
              <label htmlFor="insuranceDoc" className="cursor-pointer px-4 py-2 bg-secondary text-foreground rounded-lg inline-block text-sm hover:bg-secondary/80 transition-colors">
                Choose File
              </label>
            </div>
          )}
          <input
            id="insuranceDoc"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, setInsuranceDoc)}
            className="hidden"
          />
        </div>
      </div> */}
      
      <Button
        type="submit"
        className="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
        isLoading={signupDriverLoading}
      >
        Complete Registration
      </Button>
      
      <button 
        type="button" 
        onClick={() => setStep(2)}
        className="w-full text-sm text-primary hover:underline"
      >
        Back
      </button>
    </form>
  );

  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex justify-center mb-4">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'} text-white text-sm`}>
            1
          </div>
          <div className={`w-10 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'} text-white text-sm`}>
            2
          </div>
          <div className={`w-10 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'} text-white text-sm`}>
            3
          </div>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">
          {step === 1 && "Driver Information"}
          {step === 2 && "Verify Phone Number"}
          {step === 3 && "Upload Documents"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === 1 && "Provide your personal and vehicle details"}
          {step === 2 && "Enter the OTP sent to your phone"}
          {step === 3 && "Upload required documents to complete registration"}
        </p>
      </div>
      
      {step === 1 && renderBasicInfoForm()}
      {step === 2 && renderOtpVerificationForm()}
      {step === 3 && renderDocumentUploadForm()}
    </div>
  );
};

export default SignupForm;
