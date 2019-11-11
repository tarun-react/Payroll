import React, {Component} from 'react';
import {UIManager} from 'react-native';
import AppRoot from './AppRoot';
import SplashScreen from 'react-native-splash-screen';
import HelperMethods from 'Helpers/Methods';
import {UserInfoProvider} from './src/AppLevelComponents/Contexts/CxtUserInfo';
import PushNotification from './src/ServiceProviders/PushNotfication';
import {UpcomingShiftProvider} from './src/AppLevelComponents/Contexts/CxtUpcomingShift';
import {AvailableShiftProvider} from './src/AppLevelComponents/Contexts/CxtAvailableShift';

class App extends Component {
  componentDidMount() {
    // SplashScreen.hide()
    HelperMethods.isPlatformAndroid() &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  render() {
    return (
      <UserInfoProvider>
        <AvailableShiftProvider>
          <UpcomingShiftProvider>
            <AppRoot />
            <PushNotification />
          </UpcomingShiftProvider>
        </AvailableShiftProvider>
      </UserInfoProvider>
    );
  }
}

export default App;
