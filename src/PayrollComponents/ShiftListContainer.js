import React, {Component} from 'react';
import {FlatList, View, TouchableWithoutFeedback} from 'react-native';
import {Card} from 'react-native-elements';
import CustomText from '../AppLevelComponents/UI/CustomText';
import {withNavigation} from 'react-navigation';
import ShiftListContainerItem from './ShiftListContainerItem';
import {Colors} from "UIProps/Colors";

export class ShiftListContainer extends Component {
  renderList = ({item, index}) => {
    return (
      <ShiftListContainerItem
        item={item}
        disableClockIn={this.props.disableClockIn}
      />
    );
  };

  render() {
    const {data,backgroundColor,containerCardStyle} = this.props;
    return (
      <Card
        containerStyle={{
          margin: 0,
          backgroundColor: backgroundColor || Colors.cardBackground ,
          width: '100%',
          elevation: 5,
          ...containerCardStyle
        }}>

        <FlatList
          nestedScrollEnabled
          data={data}
          renderItem={this.renderList}
          keyExtractor={(item, index) => index + ''}
          extraData={this.state}
        />
        {this.props.children}
      </Card>
    );
  }
}


export default withNavigation(ShiftListContainer);
