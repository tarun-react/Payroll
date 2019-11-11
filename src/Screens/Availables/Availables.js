import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import Constants from 'Helpers/Constants';
import ShiftListContainer from 'PayrollComponents/ShiftListContainer';
import CustomText from 'AppLevelComponents/UI/CustomText';
import AddShiftBtn from '../../PayrollComponents/AddShiftBtn';
import CenterModal from '../../AppLevelComponents/UI/CenterModal';
import {getAvailableShifts} from 'ServiceProviders/ApiCaller'
import NetworkAwareContent from 'AppLevelComponents/UI/NetworkAwareContent';

export class Availables extends Component {
  state = {
    visible: false,
    data:[],
    isApiCall:false
  };
  closeModal = () => {
    this.setState({visible: false});
  };

  openModal = () => {
    this.setState({visible: true});
  };

  componentWillMount() {
    this.getShifts();
  }

  getShifts = () => {
    this.setState({isApiCall: true});
    getAvailableShifts()
      .then(resp => {
        this.setState({isApiCall: false, data: resp.data});
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  }

  render() {
    return (
      <>
        <Header title="Available shifts" />
        <Container>
          <View style={{width: '100%'}}>
            <CustomText
              text="All Availabilities"
              color="#000"
              style={{marginBottom: 18}}
            />
          </View>

          <NetworkAwareContent data={this.state.data} apiFunc={this.getShifts} isApiCall={this.state.isApiCall}  >
          
          <ShiftListContainer data={this.state.data} />
          </NetworkAwareContent>
          <AddShiftBtn onPress={this.openModal} />

          <CenterModal
            visible={this.state.visible}
            modalCloser={this.closeModal}
          />
        </Container>
      </>
    );
  }
}

const styles = {
  titleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default Availables;
