export class ApiUrl {

  static serverMode = true;
  static localUrl = 'http://localhost';
  // static serverUrl = 'http://52.170.96.80';
  static serverUrl = 'http://192.168.1.123';

  static baseUrl: string = ApiUrl.serverMode === true ? ApiUrl.serverUrl : ApiUrl.localUrl;

  static prodMode = true; /* this is for production or development url */
  static LOGIN_URI_PORT = ApiUrl.prodMode === true ? ':171/' : ':44322/';
  static MAIN_URI_PORT = ApiUrl.prodMode === true ? ':171/' : ':44322/';
  static USER_URI_PORT = ApiUrl.prodMode === true ? ':170/' : ':44301/';
  static DATASERVICE_URI_PORT = ApiUrl.prodMode === true ? ':173/' : ':5008/';


  static LOGIN_URI = ApiUrl.baseUrl + ApiUrl.LOGIN_URI_PORT;
  static MAIN_URI = ApiUrl.baseUrl + ApiUrl.MAIN_URI_PORT;
  static USER_URI = ApiUrl.baseUrl + ApiUrl.USER_URI_PORT;
  static DATASERVICE_URI = ApiUrl.baseUrl + ApiUrl.DATASERVICE_URI_PORT;
}


