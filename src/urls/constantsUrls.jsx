/* eslint-disable */
export class Urls {
    static API_PREFIX = '';
    static LOGIN = Urls.API_PREFIX + 'login/';
    static SEND_OTP = Urls.API_PREFIX + 'otp-send/';
    static VERIFY_OTP = Urls.API_PREFIX + 'otp-verify/';    
    static SIGNUP_DRIVER = Urls.API_PREFIX + 'self-onboard-driver/';
    static CHANGE_PASSWORD= Urls.API_PREFIX + 'change-password/'
    static GET_DASHBOARD_DATA_DRIVER = Urls.API_PREFIX + 'get-dashboarddata-driver/';
    static GET_BIDS_DATA_DRIVER = Urls.API_PREFIX + 'all-bids-driver/';
    static PLACE_BID = Urls.API_PREFIX + 'place-bid/';
    static EDIT_BID = Urls.API_PREFIX + 'edit-bid/';
    static GET_WALLET_DATA_DRIVER = Urls.API_PREFIX + 'driver-payment-overview/';
    static GET_PROFILE_DATA_DRIVER = Urls.API_PREFIX + 'driver-profile/';
    static START_TRIP = Urls.API_PREFIX + 'start-trip/';
    static END_TRIP = Urls.API_PREFIX + 'end-trip/';
    static COLLECT_PAYMENT = Urls.API_PREFIX + 'collect-payment/';
}
