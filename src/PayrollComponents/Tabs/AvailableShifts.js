import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CustomText from 'AppLevelComponents/UI/CustomText';
import Container from 'AppLevelComponents/UI/Container';
import NetworkAwareContent from 'AppLevelComponents/UI/NetworkAwareContent';
import {ShiftListContainer} from '../ShiftListContainer';
import ViewAllBtn from '../ViewAllBtn';
import Fonts from 'UIProps/Fonts';
import {withNavigation} from 'react-navigation';
import {getAvailableShifts} from 'ServiceProviders/ApiCaller';
import {AvailableShiftConsumer} from '../../AppLevelComponents/Contexts/CxtAvailableShift';
import { UserInfoConsumer } from '../../AppLevelComponents/Contexts/CxtUserInfo';

let currentContext
let infoContext
export class AvailableShifts extends Component {
  navigateAvailables = () => {
    this.props.navigation.navigate('availables');
  };

  state = {
    isApiCall: false,
    data: [],
  };

  componentDidMount() {
    this.getShifts();
  }

  getShifts = () => {
    currentContext.stopRefresh()
    this.setState({isApiCall: true});
    getAvailableShifts(infoContext.userData.loginuserID)
      .then(resp => {
        console.log(resp);
        this.setState({isApiCall: false, data: resp.data || []});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  onRefresh = () => {
    this.getShifts()
  }
  

  render() {
    return (
      <AvailableShiftConsumer>
        {context => {
          currentContext = context;
          if(context.refresh){
            this.getShifts()
          }
          return (
            <UserInfoConsumer>
              {context => {
              infoContext = context
                              return(
                                  
                            
            <Container isApiCall={this.state.isApiCall} onRefresh={this.onRefresh}>
              <View style={{width: '100%'}}>
                <CustomText
                  text="Available Shifts"
                  color="#000"
                  font={Fonts.medium}
                  style={{marginBottom: 18}}
                />
                <NetworkAwareContent
                  data={this.state.data}
                  apiFunc={this.getShifts}
                  isApiCall={this.state.isApiCall}>
                  <ShiftListContainer disableClockIn={true} data={this.state.data} />
                  {/* {this.state.data.length == 4 && 
            <ViewAllBtn onPress={this.navigateAvailables} />
            } */}
                </NetworkAwareContent>
              </View>
            </Container>
            )
                          }}
            </UserInfoConsumer>
          );
        }}
      </AvailableShiftConsumer>
    );
  }
}

export default withNavigation(AvailableShifts);
