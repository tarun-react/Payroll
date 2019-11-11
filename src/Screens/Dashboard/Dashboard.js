import React, {Component} from 'react';
import {View} from 'react-native';
import Header from '../../AppLevelComponents/UI/Header';
import Constants from 'Helpers/Constants';
import {Colors} from 'UIProps/Colors';
import TabsContainer from '../../AppLevelComponents/UI/TabsContainer';
import {SceneMap} from 'react-native-tab-view';
import HelperMethods from 'Helpers/Methods';
import BackHandlerSingleton from 'ServiceProviders/BackHandlerSingleton';
import UpcomingShifts from '../../PayrollComponents/Tabs/UpcomingShifts';
import AvailableShifts from '../../PayrollComponents/Tabs/AvailableShifts';
import SideMenu from 'react-native-side-menu';
import SideDrawerContainer from '../../AppLevelComponents/UI/SideDrawerContainer';
import {FloatingAction} from 'react-native-floating-action';
import Icons from '../../AppLevelComponents/UI/Icons';
import CenterModal from '../../AppLevelComponents/UI/CenterModal';
const FirstRoute = () => <UpcomingShifts />;

const SecondRoute = () => <AvailableShifts />;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      visible: false,
      isDrawerOpen: false,
      routes: [
        {key: 'first', title: 'Upcoming shifts'},
        {key: 'second', title: 'Available'},
      ],
    };
  }

  tabIndexSetter = index => {
    this.setState({index});
  };

  openDrawer = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
  };

  handleBackPress = () => {
    const {isDrawerOpen} = this.state;
    if (isDrawerOpen) {
      this.setState({isDrawerOpen: false});
    } else {
      HelperMethods.appExitPrompter();
      return false;
    }
  };


  render() {
    const menu = <SideDrawerContainer closeSideBar={this.openDrawer} />;
    return (
      <SideMenu
        onChange={val => this.setState({isDrawerOpen: val})}
        isOpen={this.state.isDrawerOpen}
        menu={menu}>
        <Header
          title="Payroll"
          onLeftPress={this.openDrawer}
          leftIcon={this.state.isDrawerOpen ? 'menu-open' : 'menu'}
          leftIconSize={30}
          leftIconLib="Material"
          headerType={Constants.header_back_middle_right}
        />

        <TabsContainer
          sceneMap={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          indexSetter={this.tabIndexSetter}
          state={this.state}
        />
        

        <BackHandlerSingleton onBackPress={this.handleBackPress} />
      </SideMenu>
    );
  }
}

export default Dashboard;
