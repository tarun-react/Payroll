import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import {PowerTranslator} from 'react-native-power-translator'
import Overlay from "./UI/OverlayAbstraction";
import HelperMethods from "../Helpers/Methods";

export default class NoInternetView extends Component {
  state = {
    showOverlay:false,
  };

  renderOverlay = () => {
    HelperMethods.animateLayout()
    this.setState({showOverlay:!this.state.showOverlay})
  }

  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        <PowerTranslator text="misc.noConnection" />
        <Button
          onPress={() => !this.props.connected && this.renderOverlay()}
          title="Retry"
        />
        <Overlay 
        visible={this.state.showOverlay} 
        closer={this.renderOverlay} />
      </View>
    );
  }
}
