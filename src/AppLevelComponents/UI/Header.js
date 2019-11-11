import React, { Component } from "react";
import { Text, View,TouchableOpacity,SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";
import "Helpers/global";
import {Colors} from "UIProps/Colors";
import EStyleSheet from "react-native-extended-stylesheet";
import HelperMethods from 'Helpers/Methods'
import CustomText from "./CustomText";
import Fonts from "UIProps/Fonts";
import Constants from 'Helpers/Constants'
import Icons from "./Icons";
class Header extends Component {

  navigateBack = () => {
    this.props.pop()
  }
  renderHeader(){
    const { title, leftIcon,headerType,leftIconLib,leftIconSize,onLeftPress,menuOnPress,rightIcon,onBackPress } = this.props

    switch (headerType) {
      case Constants.header_back_middle_right:
        return(
          <View style={styles.header} >
          <TouchableOpacity onPress={() => onLeftPress ? onLeftPress() : this.props.navigation.goBack()} >
            <Icons lib={leftIconLib} onPress={()=>onLeftPress()} name={leftIcon} color={Colors.lightBlack} size={leftIconSize} />
          </TouchableOpacity>
          <CustomText text="" style={{ marginLeft: 0, }} font={Fonts.medium} text={title.toUpperCase()} size={16} color='#000' />
          <View style={{width:20,height:20}}>
            <Icons lib='AntDesign' onPress={menuOnPress} name={rightIcon} color='#fff' size={20} />
          </View>
        </View>
        )
        
      default:
        return(
          <View style={styles.header} >
          <TouchableOpacity onPress={() => onBackPress ? onBackPress() : this.props.navigation.goBack()} >
          <Icons lib='Ionicons'  name={'md-arrow-back'} color={Colors.lightBlack} size={26} />
            
          </TouchableOpacity>
          <CustomText font={Fonts.medium} text={title.toUpperCase()} size={16} color='#000' />
          <View style={{width:20,height:20}} />
        </View>
        )
    }
   
  }
  render() {
    return(
      <>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.accent,color:'#fff' }} />
      <SafeAreaView style={{backgroundColor:Colors.contentCard,marginBottom:0 }}>
      {this.renderHeader()}
      </SafeAreaView>
      </>
    )
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,
  $borderRadius: 20,

  header: {
    height: HelperMethods.isPlatformAndroid() ? 53 : 45,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation:10,
    shadowColor: "#000",
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        zIndex:1
  }
});

export default  withNavigation(Header)
