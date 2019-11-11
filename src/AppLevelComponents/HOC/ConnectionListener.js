import React, { Component } from "react";
import {  Platform, UIManager } from "react-native";
import "Helpers/global";

import NetInfo from "@react-native-community/netinfo";
import HelperMethods from "../../Helpers/Methods.js";
import NoInternetView from "../NoInternetView.js";

let wasOffline = undefined;
export default (Comp: ReactClass<*>) => {
  return class ConnectionStatus extends Component {
    state = {
      connected: true,
      wasOffline: undefined
    };

    componentDidMount() {
      Platform.OS == "android" &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
      this.addListener();
    }

    removeConnectionListener() {
      NetInfo.removeEventListener(
        "connectionChange",
        this._handleConnectivityChange
      );
    }

    addListener() {
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this._handleConnectivityChange
      );
      NetInfo.isConnected.fetch().then(connected => {
        if (wasOffline != undefined) wasOffline = !connected; //assigns only once on launch

        HelperMethods.animateLayout();
        this.setState({ connected });
      });
    }

    _handleConnectivityChange = connected => {
      this.recallRetry(connected);
      wasOffline = !connected;

      HelperMethods.animateLayout();
      this.setState({ connected });
    };

    renderChilds() {
      const { children, retryCall } = this.props;

      if (this.state.connected) {
        return children;
      } else {
        return (
          <NoInternetView
            connected={this.state.connected}
            retryCall={retryCall}
          />
        );
      }
    }

    recallRetry(isConnected) {
      if (isConnected && wasOffline) {
        wasOffline = false;

        if (this.props.isApiCallCrashed)
          //check if api request is canceled in progress of http request only then call the last function..
          this.props.retryCall();
      }
    }

    render() {
      return <Comp style={{flex:1,}} {...this.props}>{this.renderChilds()}</Comp>;
    }
  };
};
