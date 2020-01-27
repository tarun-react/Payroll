import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import CustomText from 'AppLevelComponents/UI/CustomText';
import HelperMethods from 'Helpers/Methods';
import CustomButton from 'AppLevelComponents/UI/CustomButton';
import {Colors} from 'UIProps/Colors';
import Datepicker from './Datepicker';
import DropDownSuggestor from './DropDownSuggestor';
import {
  addShift,
  getShiftTimings,
  getDepartments,
} from 'ServiceProviders/ApiCaller';
import DepartmentSelector from '../../Screens/Availables/components/DepartmentSelector';
import {UserInfoConsumer} from '../Contexts/CxtUserInfo';
import {AvailableShiftConsumer} from '../Contexts/CxtAvailableShift';

let dateSelected = HelperMethods.formatDate_DMY(new Date());
let shiftTimeId = '';
let depId = '';
let currentContext;
let availableShiftContext
class CenterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '10/12/1996',
      shiftTimings: [],
      openSuggestor: false,
      selectedShift: '',
      isApiCall: false,
    };
  }

  closeModal() {
    if (!this.state.isApiCall || this.state.isApiCall == 'failed')
      this.props.modalCloser();
  }

  componentWillMount() {
    dateSelected = HelperMethods.formatDate_DMY(new Date());
  }

  getTimings(timeArr) {
    if(!this.state.selectedShift){
      let firstTime = `${timeArr[0].opening_time} - ${timeArr[0].closing_time}`
      this.setState({selectedShift:firstTime})
    }
        this.setState({shiftTimings: timeArr})
  }

  submit = () => {
    if(this.state.shiftTimings.length == 0){
      alert('Cannot create shift, available time exceeded')
      return
    }
    this.setState({isApiCall: true});
    const data = {
      date: dateSelected,
      depId,
      shiftTimeId,
      staffId: currentContext.userData.loginuserID,
    };
    addShift(data)
      .then(resp => {
        
        this.setState({isApiCall: false});
        if (resp.response_code == 'SHIFT_SUCCESS') {
          this.closeModal();
          availableShiftContext.doRefresh()
          this.props.getShifts();
        } else {
          HelperMethods.snackbar(resp.message);
        }
      })
      .catch(err => {
        this.setState({isApiCall: 'failed'});
      });
  };

  setDate(date) {
    dateSelected = date;
    this.getTimings(date)
  }

  hideDropDown = () => {
    this.setState({data: undefined});
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectShift(item)}>
        <View style={{padding: 5, paddingLeft: 13}}>
          <CustomText
            size={14}
            text={`${item.opening_time} - ${item.closing_time}`}
            color={Colors.lightBlack}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  selectShift(id, time) {
    HelperMethods.animateLayout();
    shiftTimeId = id;
    this.setState({selectedShift: time, openSuggestor: false});
  }

  openSuggestor = () => {
    HelperMethods.animateLayout();
    this.setState({openSuggestor: !this.state.openSuggestor});
  };

  render() {
    const {visible} = this.props;
    return (
      <AvailableShiftConsumer>
        {context => {
          availableShiftContext = context;
          return (
            <UserInfoConsumer>
              {context => {
                currentContext = context;
                return (
                  <Modal
                    isVisible={visible}
                    style={{flex: 1}}
                    onBackdropPress={() => this.closeModal()}
                    onBackButtonPress={() => this.closeModal()}>
                    <View style={styles.modalContainer}>
                    <View style={[styles.shiftSelector,{alignItems:'center'}]}>
                    
                    <CustomText
                          text="Select Date: "
                          color={Colors.lightBlack}
                          size={15}
                        />
                      <Datepicker
                        dateGetter={dateSelected => this.setDate(dateSelected)}
                      />

                    </View>
                      <DepartmentSelector updateTimings={timeArr => this.getTimings(timeArr)} staffId={currentContext.userData.loginuserID} depIdGetter={id => (depId = id)} />
                      <View style={styles.shiftSelector}>
                        <CustomText
                          text="Shift time: "
                          color={Colors.lightBlack}
                          size={15}
                          style={{marginTop: 28,}}
                        />

                        {this.state.shiftTimings.length == 0 ?
                          <View>
                          <CustomText
                          text="Not available now"
                          color={Colors.lightBlack}
                          size={15}
                          style={{marginTop: 28,}}
                        />
                          </View>
                        :
                        
                        <View>
                          <CustomText
                            text={this.state.selectedShift}
                            onPress={this.openSuggestor}
                            color={Colors.accent}
                            size={15}
                            style={{marginTop: 28}}
                          />

                          {this.state.openSuggestor && (
                            <DropDownSuggestor
                              data={this.state.shiftTimings}
                              hideDropDown={this.hideDropDown}
                              hideSuggestions={!this.state.openSuggestor}
                              renderItem={this.renderItem}
                              style={{backgroundColor: Colors.cardBackground}}
                            />
                          )}
                        </View>
                        }
                      </View>

                      <CustomButton
                        onPress={this.submit}
                        text="Submit"
                        isApiCall={this.state.isApiCall}
                        width={'100%'}
                        containerStyle={{
                          alignSelf: 'center',
                          marginTop: 10,
                          zIndex: 100,
                          flex: 0,
                        }}
                        buttonStyle={{padding: 10, zIndex: 100, flex: 0}}
                      />
                    </View>
                  </Modal>
                );
              }}
            </UserInfoConsumer>
          );
        }}
      </AvailableShiftConsumer>
    );
  }
}

const styles = {
  modalContainer: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 70,
    paddingTop: 10,
    paddingBottom: 20,
    alignSelf: 'center',
  },

  shiftSelector: {
    flexDirection: 'row',
  },
};
export default CenterModal;
