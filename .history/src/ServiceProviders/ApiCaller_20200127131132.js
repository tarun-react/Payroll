import React, { Component } from "react";
import { View, Text } from "react-native";
import HelperMethods from "Helpers/Methods";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import AsyncStorage from "@react-native-community/async-storage";

export const login = function(username,password,logintype = '',) {
    return new Promise(function(resolve,reject) {
        const formData = new FormData()
        formData.append('username',username)
        formData.append('password',password)
        formData.append('logintype',logintype)
        formData.append('devicetype',HelperMethods.getPlatform())
        AsyncStorage.getItem('fcmToken').then(val => {
          formData.append('deviceid',val)
          HelperMethods.makeNetworkCall('staff/login',formData,(resp, isError) => {
            if (!isError) {
                resolve(resp);
              } else {
                reject(true);
              }
          },'POST');
      });
        })
        
};

export const getAvailableShifts = function(staffId) {
  return new Promise(function(resolve,reject) {
    const formData = new FormData()
      formData.append('staffID',staffId)
      HelperMethods.makeNetworkCall('shift/available',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};

export const getUpcomingShifts = function(staffId) {
  return new Promise(function(resolve,reject) {
      const formData = new FormData()
      formData.append('staffID',staffId)
      HelperMethods.makeNetworkCall('shift/upcoming',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });

};


export const getCurrentShift = function(staffId) {
  return new Promise(function(resolve,reject) {
      const formData = new FormData()
      formData.append('staffid',staffId)
      HelperMethods.makeNetworkCall('shift/current_shift',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });

};


export const getShiftDetails = function(shift_infoID,shiftID,staffId) {
  return new Promise(function(resolve,reject) {
      const formData = new FormData()
      formData.append('shift_infoID',shift_infoID)
      formData.append('shiftID',shiftID)
      formData.append('staffID',staffId)
      // alert(JSON.stringify( formData))
      HelperMethods.makeNetworkCall('shift/details',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};

export const getShiftTimings = function(date,outletId) {
  return new Promise(function(resolve,reject) {
    var chunks = date.split('/');
    var formattedDate = chunks[1]+'/'+chunks[0]+'/'+chunks[2]

    const formData = new FormData()
    formData.append('shiftdate',formattedDate)
    formData.append('shiftdate',formattedDate)
      HelperMethods.makeNetworkCall('shift/getAllShift',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};

export const getDepartments = function(staffId) {
  return new Promise(function(resolve,reject) {

    const formData = new FormData()
    formData.append('staffID',staffId)

      HelperMethods.makeNetworkCall('shift/getAllDepartment',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};


export const addShift = function(data) {
  return new Promise(function(resolve,reject) {
    const {date,depId,shiftTimeId,staffId} = data
    // date = date.split('/').reverse().join('-')
   
      const formData = new FormData()
      formData.append('shiftid',shiftTimeId)
      formData.append('staffID',staffId)
      formData.append('departmentID',depId)
      formData.append('date', date.split('/').reverse().join('-'))

      HelperMethods.makeNetworkCall('shift/saveshiftbystaff',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};

export const setNotificationSettings = function(receive,hours,staffId) {
  return new Promise(function(resolve,reject) {
   
      const formData = new FormData()
      formData.append('receivenotification',receive)
      formData.append('hours',hours)
      formData.append('staffid',staffId)

      HelperMethods.makeNetworkCall('staff/notification',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};


export const clockIn = function(data) {
  return new Promise(function(resolve,reject) {
    const {departmentID,shift_infoID,shiftID,staffId,fcmToken,clockIN} = data
      const formData = new FormData()
      formData.append('staffID',staffId)
      formData.append('departmentID',departmentID)
      formData.append('deviceID',fcmToken)
      formData.append('shift_infoID',shift_infoID)
      formData.append('clockIN',clockIN)
      formData.append('shiftID',shiftID)
      formData.append('outletID',0)

      console.log(formData);
      HelperMethods.makeNetworkCall('shift/savedailyclockin',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};


export const clockOut = function(time,id) {
  return new Promise(function(resolve,reject) {
      const formData = new FormData()
      formData.append('clockOUT',time)
      formData.append('clockid',id)
      HelperMethods.makeNetworkCall('shift/savedailyclockout',formData,(resp, isError) => {
          if (!isError) {
              resolve(resp);
            } else {
              reject(true);
            }
        },'POST');
    });
};




