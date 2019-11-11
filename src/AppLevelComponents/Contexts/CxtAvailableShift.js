import React, { Component } from "react";

export const AvailableShiftContext = React.createContext();
export const AvailableShiftConsumer = AvailableShiftContext.Consumer;

export class AvailableShiftProvider extends Component {
  state = {
  refresh:false,
  };


  doRefresh = () => {
    this.setState({refresh:true})
  }

  stopRefresh = () => {
    this.setState({refresh:false})
  }
  render() {
    return (
      <AvailableShiftContext.Provider
        value={{
          doRefresh:this.doRefresh,
          refresh:this.state.refresh,
          stopRefresh:this.stopRefresh,
        }}>
        {this.props.children}
      </AvailableShiftContext.Provider>
    );
  }
}
