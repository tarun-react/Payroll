import React, { Component } from "react";
import { Text, Image } from "react-native";
import "Helpers/global";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import HelperMethods from "Helpers/Methods";
import Constants from "Helpers/Constants";

export default class CustomText extends Component {
  render() {
    let {
      size,
      onPress,
      textAlign,
      type,
      color,
      font,
      padding,
      singleLine,
      paddingHorizontal,
      text,
      style
    } = this.props;
    let rem = global.rem;
    switch (type) {
      case "title":
        font = Fonts.heavy;
        size = !size ? 21 : size;
        break;

      default:
          
        break;
    }

    padding = padding == undefined && 1

    let fontname = font ? font : Fonts.regular
    return (
            <Text
              numberOfLines={singleLine ? 1 : undefined}
              allowFontScaling={false}
              onPress={onPress ? () => onPress() : onPress}
              style={[
                styles.text,
                {
                  fontSize: size || 18 - HelperMethods.isPlatformIos() ? 15 : 0 ,
                  color: color || Colors.white,
                  fontFamily: HelperMethods.isPlatformAndroid()
                    ? fontname
                    : null,
                  padding: padding || 5 ,
                  paddingHorizontal:
                    (padding == undefined || paddingHorizontal == undefined)
                      ? 0
                      : paddingHorizontal * global.rem,
                  textAlign: textAlign ,
                  
                  ...style
                }
              ]}
            >
              {text}
            </Text>
    );
  }
}

const styles = EStyleSheet.create({
  text: {
    textAlign: "center"
  }
});
