import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CustomButton from 'AppLevelComponents/UI/CustomButton';
import {clockIn, clockOut} from 'ServiceProviders/ApiCaller';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import HelperMethods from '../Helpers/Methods';
import {UserInfoConsumer} from '../AppLevelComponents/Contexts/CxtUserInfo';
import {withNavigation} from 'react-navigation';
import {UpcomingShiftConsumer} from '../AppLevelComponents/Contexts/CxtUpcomingShift';
import {AvailableShiftConsumer} from '../AppLevelComponents/Contexts/CxtAvailableShift';

let currentContext;
let upcomingShiftCxt;
let availableShiftCxt;

class ClockInOutBtns extends Component {
  state = {
    isApiCall: false,
    isClockedIn: false,
  };

  clockInTime = () => {
    this.setState({isApiCall: true});
    AsyncStorage.getItem('fcmToken').then(val => {
      var current_time = moment().format('HH:mm');
      clockIn({
        staffId: currentContext.userData.loginuserID,
        fcmToken: val,
        clockIN: current_time,
        ...this.props.data,
      })
        .then(resp => {
          this.setState({isApiCall: false});
          if (resp.response_code == 'SUCCESS') {
            HelperMethods.animateLayout()
            this.setState({isClockedIn: true});
            upcomingShiftCxt.doRefresh();
            HelperMethods.snackbar('Clocked in successfully');
            this.props.navigation.pop();
          } else {
            HelperMethods.snackbar(resp.response_code);
          }
        })
        .catch(err => {
          this.setState({isApiCall: 'failed'});
        });
    });
  };

  clockOutTime = () => {
    this.setState({isApiCall: true});
    var current_time = moment().format('HH:mm');
    const {shift_pkID} = this.props.data;
    clockOut(current_time, shift_pkID)
      .then(resp => {
        this.setState({isApiCall: false});
        if (resp.response_code == 'SUCCESS') {
          HelperMethods.snackbar('Clocked out successfully');
          upcomingShiftCxt.doRefresh();
          availableShiftCxt.doRefresh()
          this.props.navigation.pop();
        } else {
          HelperMethods.snackbar(resp.response_code);
        }
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  renderButtons (){
    const {clockIN,canClockin} = this.props;
    const {isClockedIn} = this.state;
    if(canClockin) {
      return(
        <CustomButton
        onPress={this.clockInTime}
        text="Clock in"
        isRightIcon={true}
        icon="clockcircleo"
        isApiCall={this.state.isApiCall}
        containerStyle={{
          alignSelf: 'center',
          marginVertical: 10,
        }}
      />
        )
    } else {
      return(
        <CustomButton
        onPress={this.clockOutTime}
        text="Clock out"
        isRightIcon={true}
        isApiCall={this.state.isApiCall}
        icon="clockcircleo"
        containerStyle={{
          alignSelf: 'center',
          marginVertical: 10,
        }}
        
      />
      )
    }
  }
 
  render() {
    const {canClockin, style, clockIN} = this.props;
    const {isClockedIn} = this.state;
    return (
      <AvailableShiftConsumer>
        {context => {
          availableShiftCxt = context;
          return (
            <UpcomingShiftConsumer>
              {context => {
                upcomingShiftCxt = context;
                return (
                  <UserInfoConsumer>
                    {context => {
                      currentContext = context;
                      return (
                        <View style={[styles.container, {...style}]}>
                          {canClockin != 'undefined' && this.renderButtons()}
                        </View>
                      );
                    }}
                  </UserInfoConsumer>
                );
              }}
            </UpcomingShiftConsumer>
          );
        }}
      </AvailableShiftConsumer>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
export default withNavigation(ClockInOutBtns);
