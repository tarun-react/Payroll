import React, { Component } from "react";

export const UpcomingShiftContext = React.createContext();
export const UpcomingShiftConsumer = UpcomingShiftContext.Consumer;

export class UpcomingShiftProvider extends Component {
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
      <UpcomingShiftContext.Provider
        value={{
          doRefresh:this.doRefresh,
          refresh:this.state.refresh,
          stopRefresh:this.stopRefresh,
        }}>
        {this.props.children}
      </UpcomingShiftContext.Provider>
    );
  }
}
