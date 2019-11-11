import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CustomText from 'AppLevelComponents/UI/CustomText';
import Container from 'AppLevelComponents/UI/Container';
import {ShiftListContainer} from '../ShiftListContainer';
import ClockInOutBtns from '../ClockInOutBtns';
import Fonts from 'UIProps/Fonts';
import {withNavigation} from 'react-navigation';
import {Colors} from 'UIProps/Colors';
import {getCurrentShift, getUpcomingShifts} from 'ServiceProviders/ApiCaller';
import {FloatingAction} from 'react-native-floating-action';
import Icons from 'AppLevelComponents/UI/Icons';
import CenterModal from 'AppLevelComponents/UI/CenterModal';
import NetworkAwareContent from 'AppLevelComponents/UI/NetworkAwareContent';
import {UserInfoConsumer} from '../../AppLevelComponents/Contexts/CxtUserInfo';
import HelperMethods from '../../Helpers/Methods';
import {UpcomingShiftConsumer} from '../../AppLevelComponents/Contexts/CxtUpcomingShift';

let currentContext;
let upcomingShiftCxt;
export class UpcomingShifts extends Component {
  navigateAllShifts = () => {
    this.props.navigation.navigate('allShifts');
  };

  state = {
    data: [],
    currentShiftData: {},
    isApiCall: false,
    isGettingCurrentShift:false,
    visible: false,
  };

  componentDidMount() {
    this.getShifts();
  }

  getShifts = () => {
    this.getCurrentShift();
    upcomingShiftCxt.stopRefresh();
    HelperMethods.animateLayout();
    this.setState({isApiCall: true});
    getUpcomingShifts(currentContext.userData.loginuserID)
      .then(resp => {
        console.log(resp);
        this.setState({isApiCall: false,data: resp.data || []});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  getCurrentShift = () => {
    this.setState({isGettingCurrentShift:true})
    getCurrentShift(currentContext.userData.loginuserID)
      .then(resp => {
        
        this.setState({isGettingCurrentShift: false, currentShiftData: resp.data || []});
      })
      .catch(err => {
        this.setState({isGettingCurrentShift: 'failed'});
      });
  };

  handleActionTap() {
    this.setState({visible: true});
  }

  closeModal = () => {
    this.setState({visible: false});
  };

  renderCurrentShift() {
    const {currentShiftData} = this.state;
    if (currentShiftData) {
      return (
        <>
        <CustomText
            font={Fonts.medium}
            text="Current Shift"
            color="#000"
            style={{marginTop: 40}}
          />
        <NetworkAwareContent
          data={currentShiftData}
          apiFunc={this.getCurrentShift}
          isApiCall={this.state.isGettingCurrentShift}>

          
            <ShiftListContainer containerCardStyle={{borderRadius:10,marginTop:10}} backgroundColor={Colors.accent} data={[currentShiftData]} />
          <ClockInOutBtns clockIN={currentShiftData.clockIN} data={currentShiftData} />
          </NetworkAwareContent>
          </>
      );
    }
  }

  onRefresh = () => {
    this.getShifts()
  }

  render() {
    return (
      <UpcomingShiftConsumer>
        {context => {
          upcomingShiftCxt = context;
          if (upcomingShiftCxt.refresh) {
            this.getShifts();
          }
          return (
            <UserInfoConsumer>
              {context => {
                currentContext = context;
                return (
                  <>
                    <Container isApiCall={this.state.isApiCall} onRefresh={this.onRefresh}>
                      <View style={{width: '100%'}}>
                        <CustomText
                          text="Upcoming Shifts"
                          color="#000"
                          font={Fonts.medium}
                          style={{marginBottom: 18}}
                        />
                        <NetworkAwareContent
                          data={this.state.data}
                          apiFunc={this.getShifts}
                          isApiCall={this.state.isApiCall}>
                          <ShiftListContainer data={this.state.data} />
                          {/* <ViewAllBtn onPress={this.navigateAllShifts} /> */}
                        </NetworkAwareContent>
                        {this.renderCurrentShift()}
                      </View>

                      <CenterModal
                        visible={this.state.visible}
                        modalCloser={this.closeModal}
                        getShifts={this.getShifts}
                      />
                    </Container>

                    <FloatingAction
                      color={Colors.accent}
                      floatingIcon={
                        <Icons
                          size={17}
                          lib="Fontisto"
                          name={'plus-a'}
                          color="#fff"
                        />
                      }
                      showBackground={false}
                      color={Colors.accent}
                      onPressMain={name => {
                        this.handleActionTap(name);
                      }}
                    />
                  </>
                );
              }}
            </UserInfoConsumer>
          );
        }}
      </UpcomingShiftConsumer>
    );
  }
}

export default withNavigation(UpcomingShifts);
