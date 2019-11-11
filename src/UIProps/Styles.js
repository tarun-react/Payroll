import 'Helpers/global'
import EStyleSheet from "react-native-extended-stylesheet";
import {Colors} from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
EStyleSheet.build({
  $rem: global.rem
});

export const inputStyles = EStyleSheet.create({
  borderWidth: 0,
  paddingLeft:0,
  fontSize:14,
  color:'#FFFFFF',
});

export let labelStyle = EStyleSheet.create({
  
  
  paddingLeft:0,
  top:20,
  color: '#8C8E8D',
  fontFamily: Fonts.medium,
  fontSize:14,
});

export const inputStylesContainer = EStyleSheet.create({
  
  // padding: global.rem * 5,

  color: "#fff",
  alignSelf:'flex-start',
  
  marginTop:  20
});

export const inputErrors = {
  color: "red",
  fontSize: 12,
  marginTop:6,
  textAlign:'left',
};

export const inputContainerStyle = {
  
  borderBottomColor: '#8C8E8D',
        borderBottomWidth: 0.5,
        
        marginTop:15,
        
  
};

export const cardStyle = {
  backgroundColor:Colors.noticeMsgBox,
      alignItems: "flex-start",
      margin:0,
      borderRadius: 5,
      marginVertical: 10,
}
export const personaContainer = {
    
    flex:1,
    width: "100%",
    backgroundColor: '#f7f7f9',
}

export const containerStyle = {
  flex: 1,
  padding:15*global.rem,
    backgroundColor: "#000"
  
}

export const containerContentStyle = {
 
alignItems: "center",flexGrow:1, paddingBottom:10,

  
}

