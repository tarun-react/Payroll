import React, {Component} from 'react';
import {Text, View} from 'react-native';
import UIStepper from 'react-native-ui-stepper';
import {Colors} from "UIProps/Colors";
import {UserInfoConsumer} from '../AppLevelComponents/Contexts/CxtUserInfo';

let currentContext;
export class NumberStepper extends Component {
  state = {
    initialValue: undefined,
  };
  setValue = value => {
    this.props.valGetter(value);
  };

  componentDidMount() {
    this.setState({initialValue: currentContext.userData.hours});
  }

  render() {
    return (
      <UserInfoConsumer>
        {context => {
          currentContext = context;
          return (
            <>
              {this.state.initialValue && (
                <UIStepper
                tintColor={Colors.accent}
                  initialValue={parseInt(this.state.initialValue)}
                  displayValue={true}
                  minimumValue={1}
                  maximumValue={10}
                  onValueChange={value => {
                    this.setValue(value);
                  }}
                />
              )}
            </>
          );
        }}
      </UserInfoConsumer>
    );
  }
}

export default NumberStepper;
