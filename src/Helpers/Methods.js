import {
  Alert,
  AsyncStorage,
  BackHandler,
  Platform,
  Linking,
  LayoutAnimation,
  ToastAndroid
} from "react-native";
import Snackbar from 'react-native-snackbar'
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import NavigationService from "ServiceProviders/NavigationService";
import moment from "moment";
import "Helpers/global";
import { Colors } from "UIProps/Colors";
import Constants from 'Helpers/Constants'
import { storeToken, getToken } from 'DataManagers/UserDataManager'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";

let timer;
let baseUrl = 'http://13.235.169.150/payroll/api/'
let counter = 2;

var CancelToken = axios.CancelToken;
var cancel;
const reqTimeout = 15000

const HelperMethods = {
  showAlert: function(
    message,
    btnPositive,
    btnNegative,
    onPress_btnNegative,
    onPress_btnPositive,
    buttonNeutral,
    onPressNeutral
  ) {
    Alert.alert(
      "Alert",
      message,
      [
        buttonNeutral != undefined && {
          text: buttonNeutral,
          onPress: () => onPressNeutral()
        },

        {
          text: btnNegative,
          onPress:
            onPress_btnNegative == "" ? () => {} : () => onPress_btnNegative(),
          style: "cancel"
        },
        { text: btnPositive, onPress: () => onPress_btnPositive() }
      ],
      { cancelable: false }
    );
  },

  animateLayout: function() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },

  getPlatform:function(){
    return Platform.OS
  },

  isPlatformAndroid: function() {
    return Platform.OS == "android";
  },

  isPlatformIos: function() {
    return Platform.OS == "ios";
  },

  isConnected:function(){
    return new Promise((resolve,reject) => {
      NetInfo.fetch().then(state => {
        resolve(state.isConnected)
      });
    })
    
  },

  makeNetworkCall: function(apiName, formData, callBack,method = 'GET',skipToken = false) {
    this.isConnected().then(connected => {
      if(!connected){
        callBack(false,true)
        this.snackbar('No internet connection')
      } else {
        if(skipToken){
          this.makeApiCall(apiName,formData,formData,callBack,method)
        } else {
          const Headers = { 'Authorization': `Basic YWRtaW46MTIzNDU=`, 'X-API-KEY':'1234567' }
          this.makeApiCall(apiName,Headers,formData,callBack,method)
        }
      }
    })
  },

  promiseTimeout : function (msec,callBack) {
    if(timer){
      clearTimeout(timer)
    }

    return promise => {
      const timeout = new Promise((yea, nah) => {
       timer = setTimeout(() => {
        callBack(false,true)
        cancel();
      },msec)
    })
      return Promise.race([promise, timeout])
    }
  },

  makeApiCall:function(apiName,headers,formData,callBack,method){

    axios.interceptors.request.use(request => {
      return request
    })
  // axios.interceptors.response.use(response => console.log('reponse', response))
    this.promiseTimeout(reqTimeout,callBack)(axios({
      url: baseUrl+apiName,
      data:method == 'POST' ? formData : null ,
      headers,
      cancelToken: new CancelToken(
        function executor(c) {
            cancel = c;
         }),
      method,
    })
    .then((response) => {
      console.log(response)
      clearTimeout(timer)
        callBack(response.data, false);
    })
    .catch(error => {
      console.log(error);
      if(axios.isCancel(error)){
        this.snackbar(`Request timeout, please retry`,'OK',()=>{})
      } else {
        callBack(false, true);
        this.snackbar(`Api ${error}`,'OK',()=>{})
      }
    }))
  },

  logout: function(navigation) {
    AsyncStorageHandler.deleteData(Constants.userInfoObj,() => {
      navigation.navigate('LoginStack')
    })
  },

  navigateHome: function(){
  },

  snackbar: function(message, actionFuncTitle = 'OK', actionFunc = ()=>{}, length = 'short') {
    let snackLen = length == "short" ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG;
    Snackbar.show({
      backgroundColor: Colors.accent,
      title: message,
      duration: snackLen,
      color: '#fff',
      action: {
        title: actionFuncTitle,
        color: '#fff',
        onPress: () => {
          actionFunc();
        }
      }
    });
  },

  capitailizeFirst: (String.prototype = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }),

  openGMaps: function(lat, lng, label) {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  },

  

  makeCall: function(mob) {
    Linking.openURL(`tel:${mob}`);
  },

  openAppinPS: function(packageName) {
    Linking.openURL("market://details?id=" + packageName + "&hl=en");
  },

  appExitPrompter: function() {
    if (counter == 2) {
      setTimeout(() => {
        counter = 2;
      }, 2000);
      ToastAndroid.show("Press again to Quit", 1000);
    }
    counter -= 1;
    if (counter == 0) BackHandler.exitApp();
  },

  switchToLangSelector: function() {
    NavigationService.navigate("langSelectorStack", {
      isForLanguageChange: true
    });
  },

  formatDate_DMY: function(date) { //requires date in format 2-2-2 or 2/2/2 with time or without time
    return moment(date).format("DD/MM/YYYY");
  },

  formatDate_MDY: function(date) { //requires date in format 2-2-2 or 2/2/2 with time or without time
    return moment(date).format("MM/DD/YYYY");
  },

  formatDate_YMD: function(date) { //requires date in format 2-2-2 or 2/2/2 with time or without time
    return moment(date).format("YYYY-MM-DD");
  },

  formatDate_Month_Date: function(date) { //requires date in format 2-2-2 or 2/2/2 with time or without time
    let month =  moment(date).format("mmmm");
    let dateNumber =  moment(date).format("d");
    return `${month} ${dateNumber}`
  },

  formatAMPM: function(time) {
    // moment("02:00 PM", "h:mm A").format("HH:mm")
   return moment(time,'h:mm A').format('LT')
  },

  
};

export default HelperMethods;
