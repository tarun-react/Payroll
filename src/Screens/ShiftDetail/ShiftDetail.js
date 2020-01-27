import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import CustomText from 'AppLevelComponents/UI/CustomText';
import ClockInOutBtns from '../../PayrollComponents/ClockInOutBtns';
import {Colors} from 'UIProps/Colors';
import NetworkAwareContent from 'AppLevelComponents/UI/NetworkAwareContent';
import {getShiftDetails} from 'ServiceProviders/ApiCaller';
import {UserInfoConsumer} from 'AppLevelComponents/Contexts/CxtUserInfo';

let shiftDetailTextColor = '#000';
let shiftDetailTextSize = 15;
let currentContext;

class ShiftDetailInfo extends Component {
  render() {
    const {date, time, name, clockin, ClockedIN, clockout} = this.props;
    return (
      <View style={styles.shiftDetailInfocontainer}>
        <CustomText
          text={date}
          color={shiftDetailTextColor}
          size={shiftDetailTextSize}
        />
        <CustomText
          text={time}
          color={shiftDetailTextColor}
          size={shiftDetailTextSize}
        />
        <CustomText
          text={name}
          color={shiftDetailTextColor}
          size={shiftDetailTextSize}
        />

        {clockin != undefined && (
          <View style={{marginTop: 15}}>
            <CustomText
              text={`Clocked in at: ${clockin} `}
              color={shiftDetailTextColor}
              size={shiftDetailTextSize}
            />
          </View>
        )}
      </View>
    );
  }
}

export class ShiftDetail extends Component {
  state = {
    data: [],
    isApiCall: undefined,
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const {shift_infoID, shiftID} = this.props.navigation.state.params;
    this.setState({isApiCall: true});
    getShiftDetails(shift_infoID, shiftID, currentContext.userData.loginuserID)
      .then(resp => {
        console.log(resp);
        this.setState({isApiCall: false, data: resp.message});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  renderFooter() {
    const {ClockedIN,canClockin, clockIN} = this.state.data || {};
    if (ClockedIN ) {
      return (
        <View style={styles.shiftClockedIn}>
          <CustomText text="Another shift is in progress" color="#fff" />
        </View>
      );
    } else {
      return (
        <ClockInOutBtns
          clockIN={clockIN}
          data={this.state.data}
          canClockin={canClockin}
          style={{padding: 20, paddingBottom: 0}}
        />
      );
    }
  }

  render() {
    const {shift_time, shift_infoID, shift_date, ClockedIN, clockIN, clockOUT} = this.state.data || {};
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          return (
            <>
              <Header title="shift detail" />
              <Container>
                <View style={{width: '100%'}}>
                  <CustomText
                    text={`Shift #${shift_infoID}`}
                    color="#000"
                    style={{marginBottom: 18}}
                  />
                  <NetworkAwareContent
                    data={this.state.data}
                    apiFunc={this.getDetails}
                    isApiCall={this.state.isApiCall}>
                    <ShiftDetailInfo
                      date={shift_date}
                      time={shift_time}
                      name={context.userData.name}
                      clockin={clockIN}
                      clockout={clockOUT}
                      ClockedIN={ClockedIN}
                    />
                  </NetworkAwareContent>
                </View>
              </Container>
              {(!this.state.isApiCall && !this.props.navigation.state.params.disableClockIn ) && this.renderFooter()}
            </>
          );
        }}
      </UserInfoConsumer>
    );
  }
}

const styles = {
  titleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  shiftClockedIn: {
    backgroundColor: Colors.accent,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  shiftDetailInfocontainer: {
    width: '100%',
    padding: 10,
    backgroundColor: Colors.cardBackground,
    elevation: 7,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
};

export default ShiftDetail;
