/* eslint-disable */

import { HttpAxiosService } from './httpService';
import { Urls } from './constantsUrls.jsx';
import { test_url } from "../../src/config/environment.js"

const project = new HttpAxiosService('http://127.0.0.1:8000/');

export const login = (payload_data) => {
  return project.post(Urls.LOGIN , payload_data);
};

export const sendOtpService = (payload_data) => {
  return project.post(Urls.SEND_OTP , payload_data);
};

export const signupDriverService = (payload_data) => {  
  return project.post(Urls.SIGNUP_DRIVER , payload_data);
};

export const verifyOtpService = (payload_data) => {
  return project.post(Urls.VERIFY_OTP , payload_data);
};
export const placeBidService = (payload_data) => {
  return project.post(Urls.PLACE_BID , payload_data);
};


export const getDashboardDataDriver = (payload_data) => {
  return project.get(Urls.GET_DASHBOARD_DATA_DRIVER , payload_data);
};

export const getBidsDataDriver = (payload_data) => {
  return project.get(Urls.GET_BIDS_DATA_DRIVER , payload_data);
};

export const getWalletDataDriver = (payload_data) => {
  return project.get(Urls.GET_WALLET_DATA_DRIVER , payload_data);
};  

export const getProfileDataDriver = (payload_data) => {
  return project.get(Urls.GET_PROFILE_DATA_DRIVER , payload_data);
};  

