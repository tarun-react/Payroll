import React, { Component, Fragment } from "react";
import { UIManager } from 'react-native'
import {  createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Login from "./src/Screens/Login/Login";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import {
    zoomIn,
    fromBottom,
    fromLeft,
    fromRight
  } from "react-navigation-transitions";
import Dashboard from "./src/Screens/Dashboard/Dashboard";
import AllShifts from "./src/Screens/AllShifts/AllShifts";
import ShiftDetail from "./src/Screens/ShiftDetail/ShiftDetail";
import Availables from "./src/Screens/Availables/Availables";
import Settings from "./src/Screens/Settings/Settings";
let transitionSpeed = 650;
let tabIconSize = 18;
const transitionConfig = {
    duration: 500,
};


const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
  
    // Custom transitions here..
    if (
      prevScene &&
      prevScene.route.routeName === "Noticeboard" &&
      nextScene.route.routeName === "iCard"
    ) {
      return zoomIn(transitionSpeed);
    } else if (
      prevScene &&
      prevScene.route.routeName === "Noticeboard" &&
      nextScene.route.routeName === "Profile"
    ) {
      return null;
    }
    return fromRight(transitionSpeed);
  };


const LoginStack = createStackNavigator({
    login:Login
},
{
    initialRouteName: 'login',
    transitionConfig: () => fromRight(200),
    headerMode:'none',
})

const DashboardStack = createStackNavigator({
  dashboard:Dashboard,
  allShifts:AllShifts,
  shiftDetail:ShiftDetail,
  availables:Availables,
  Settings:Settings,

},{
  initialRouteName: 'dashboard',
    transitionConfig: () => fromRight(200),
    headerMode:'none',
})


// {
//     initialRouteName: 'applicationProccess',
//     transitionConfig: () => fromRight(200),
//     headerMode:'none',
// })



const TopLevelNavigator = createAnimatedSwitchNavigator(
    {
      LoginStack,
      DashboardStack,
    },
    {
        //The previous screen will slide to the bottom while the next screen will fade in
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="scale"
                    durationMs={500}
                    interpolation="easeIn"
                />
                <Transition.In type="slide-top" durationMs={transitionSpeed} />
            </Transition.Together>
        )
    }
);

export default createAppContainer(TopLevelNavigator);

