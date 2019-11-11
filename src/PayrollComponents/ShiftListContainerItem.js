import React, {Component} from 'react';
import {FlatList, View, TouchableWithoutFeedback} from 'react-native';
import {withNavigation} from 'react-navigation';
import CustomText from '../AppLevelComponents/UI/CustomText';
import HelperMethods from '../Helpers/Methods';

class ShiftListContainerItem extends Component {
   
      navigateShiftDetail = () => {
        const {shift_infoID,shiftID, date, time, name, clockin, clockout} = this.props.item

        this.props.navigation.navigate('shiftDetail', {
          shift_infoID,
          shiftID,
          date,
          time,
          name,
          clockin,
          clockout,
          disableClockIn:this.props.disableClockIn,
        });
      };

      render() {
        let {shift_date, shift_time,fromtime,totime} = this.props.item
        
        return (
          <TouchableWithoutFeedback onPress={this.navigateShiftDetail}>
            <View style={styles.shiftListContainerItem}>
              <CustomText size={14.4} text={shift_date} color="#000" />
              <CustomText size={14.4} text={shift_time} color="#000" />
            </View>
          </TouchableWithoutFeedback>
        );
      }
  }

const styles = {
  shiftListContainerItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 8,
    borderRadius: 6,
  },
};
export default withNavigation(ShiftListContainerItem);
