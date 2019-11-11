import React, {Component} from 'react';
import {View, Switch} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import CustomText from 'AppLevelComponents/UI/CustomText';
import {Colors} from 'UIProps/Colors';
import NumberStepper from 'PayrollComponents/NumberStepper';
import {setNotificationSettings} from 'ServiceProviders/ApiCaller';
import CustomButton from 'AppLevelComponents/UI/CustomButton';
import HelperMethods from '../../Helpers/Methods';
import {UserInfoConsumer} from '../../AppLevelComponents/Contexts/CxtUserInfo';
import {storeUserInfo} from 'DataManagers/UserDataManager'



let currentContext

export class Settings extends Component {
  state = {
    pNotifications: undefined,
    settingsEdited: false,
    isApiCall: false,
    hours:undefined
  };

  togglePNotifications = val => {
    this.setState({pNotifications: val});
    this.setSettingsEdited();
  };


  componentDidMount(){
    let val = currentContext.userData.receivenotification == '1' ? true : false
    let hours = currentContext.userData.hours
    this.setState({pNotifications:val,hours})
  }

  setValue(number) {
    this.setState({hours:number})
    this.setSettingsEdited();
  }

  setSettingsEdited() {
    HelperMethods.animateLayout();
    this.setState({settingsEdited: true});
  }

  applySettings = () => {
    this.setState({isApiCall: true});
    const {pNotifications,hours} = this.state
    let notificationSetting = pNotifications ? 1 : 0
    setNotificationSettings(notificationSetting,hours, currentContext.userData.loginuserID)
      .then(resp => {
        this.setState({isApiCall: false})
        if(resp.response_code == 'NOTIFICATION_UPDATE' ){
          currentContext.userData.receivenotification = notificationSetting
          currentContext.userData.hours = hours
          storeUserInfo(currentContext.userData)
          HelperMethods.snackbar('Settings updated')
          this.setState({ settingsEdited: false});
        }
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  render() {
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          return (
            <>
              <Header title="settings" />
              <Container>
                <View style={{width: '100%'}}>
                  <View style={styles.itemContainer}>
                    <CustomText
                      text="Receive notifications"
                      color="#000"
                      size={15}
                    />
                    <Switch
                      trackColor={{true: Colors.accent}}
                      onValueChange={this.togglePNotifications}
                      value={this.state.pNotifications }
                    />
                  </View>

                  <View style={styles.itemContainer}>
                    <CustomText
                      text="Hour(s) before notifications"
                      color="#000"
                      size={15}
                    />
                    <NumberStepper valGetter={val => this.setValue(val)} />
                  </View>
                  {this.state.settingsEdited && (
                    <CustomButton
                      onPress={this.applySettings}
                      text="Apply"
                      isApiCall={this.state.isApiCall}
                    />
                  )}
                </View>
              </Container>
            </>
          );
        }}
      </UserInfoConsumer>
    );
  }
}

const styles = {
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 25,
  },
};

export default Settings;
