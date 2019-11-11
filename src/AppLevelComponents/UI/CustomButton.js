import React, { Component } from "react";
import { Keyboard, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from 'react-native-animatable';
import { Button } from "react-native-elements";
import HelperMethods from "Helpers/Methods";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class CustomButton extends Component {

  state ={
    animation:''
  }
  onPress() {
    let { onPress } = this.props;
    if (!onPress) {
      alert("Provide onpress prop");
      return;
    }
    onPress();
    Keyboard.dismiss();
  }

  componentWillReceiveProps(nextProps){
    const {isApiCall} = nextProps
      this.setState({animation:isApiCall == 'failed' ? 'shake' : '' } )
  }

  render() {
    let { text, isApiCall,font,buttonStyle, width,isRightIcon,icon,borderRadius, containerStyle, textColor } = this.props;

    let title = text+` ${isApiCall == 'failed' ? '- Retry' : '' } `
    let fontType 
    if(HelperMethods.isPlatformAndroid()){
      fontType = font || Fonts.medium
    } else {
      fontType = null
    }
    return (
      <Animatable.View animation={this.state.animation} useNativeDriver={true} duration={600} style={{flex:1,...containerStyle}} >

      <Button
        disabled={isApiCall && isApiCall != 'failed' }
        onPress={() => this.onPress()}
        title={title.toUpperCase()}
        titleStyle={{paddingLeft:7,fontFamily:  HelperMethods.isPlatformAndroid()  ? Fonts.medium : undefined ,fontSize:HelperMethods.isPlatformIos() ? 13 : 14,color:'#3F70FF' }}
        icon={
          isRightIcon && (
            <AntDesign
              name={icon}
              size={20}
              color={Colors.accent}
              style={{paddingRight:5,marginLeft:-10}}
            />
          )
        }
        textColor={textColor || '#3F70FF'}
        containerStyle={{
          elevation:1,
          borderRadius:27,
          width: width || "100%",
          ...containerStyle
        }}
        buttonStyle={[
          styles.button,
          { borderRadius: borderRadius || 27,...buttonStyle },
          
        ]}
        loading={isApiCall && isApiCall != 'failed'}
      />
      </Animatable.View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  button: {
    padding:10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    
    borderWidth:1,
    borderColor:'#3F70FF'
  }
});
