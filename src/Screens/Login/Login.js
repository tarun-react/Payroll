import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import { withNavigation } from "react-navigation";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
import { Colors } from "UIProps/Colors";
import { personaContainer } from "UIProps/Styles";
import LoginFacebook from 'ServiceProviders/SocialLogins/LoginFacebook'
import LoginGoogle from 'ServiceProviders/SocialLogins/LoginGoogle'
import {login} from 'ServiceProviders/ApiCaller'
import CustomText from "AppLevelComponents/UI/CustomText";
import ScreenMemory from "AppLevelComponents/UI/ScreenMemory";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import Divider from "AppLevelComponents/UI/Divider";
import Fonts from "UIProps/Fonts";
import Email from "AppLevelComponents/UI/FormInputs/Email";
import Password from "AppLevelComponents/UI/FormInputs/Password";
import { UserInfoConsumer } from "AppLevelComponents/Contexts/CxtUserInfo";
import {storeUserInfo} from 'DataManagers/UserDataManager'
 
let currentContext
let valObj = {
  // email: "praveen15php@gmail.com",
  // password: "12345"
  email: "",
  password: ""
};
class Login extends Component {
  state = {
    isApiCall: undefined,
    data:[],
  };

  doLogin = () => {
    this.setState({isApiCall:true})
       login(valObj.email,valObj.password).then(resp => {
         if(!resp.status){
         this.setState({isApiCall:'failed'})
          return
         }
         currentContext.setUserData(resp.data)
         storeUserInfo(resp.data).then(()=>{
           this.props.navigation.navigate('DashboardStack')
        })

       }).catch(err => {
         this.setState({isApiCall:'failed'})
       })

  };
  
  render() {
    return (

      <UserInfoConsumer>
        {context => {
        currentContext = context
                        return(
                    <ScreenMemory screen='login' >

      <ImageBackground source={require('assets/img/background.png')} style={{flex:1,width:'100%',height:'100%'}}  >

      <Container style={{backgroundColor:''}} padding={0} contentPadding={0} scroll={true}>
        <View style={[personaContainer, { padding: 15,backgroundColor:'transparent',justifyContent:'space-between' }]}>
          <View style={styles.subContainer}>
            <CustomText
              text="Payroll"
              color={Colors.white}
              style={{ marginTop: 70,fontSize:30,}}
              font={Fonts.heavy}
            />
            <Divider style={{ width: "100%" }} />
          </View>

          <View style={styles.containerInputs}>
            <Email    placeholder='Enter your email address' value={valObj.email} inputStyle={styles.inputStyle} inputContainerStyleAdditional={styles.inputContainer} labelStyleAdditional={styles.labelStyle} marginBottom={7} inputValueGetter={text => (valObj.email = text)} />
            <Password placeholder='Enter your password'  value={valObj.password} inputStyle={styles.inputStyle} inputContainerStyleAdditional={styles.inputContainer} labelStyleAdditional={styles.labelStyle} inputValueGetter={text => (valObj.password = text)} />

            <View style={styles.socialLogins} >
                <LoginFacebook backgroundViewStyle={styles.circle} size={25} iconType='icon' /> 
                  <View style={{paddingHorizontal:20}} />
                <LoginGoogle backgroundViewStyle={styles.circle} size={23} iconType='icon'/>
            </View>

            <CustomButton
              onPress={this.doLogin}
              text="Sign in"
              containerStyle={{ marginVertical: 5 }}
              isApiCall={this.state.isApiCall}
            />

          </View>
        </View>
      </Container>
      </ImageBackground>
      </ScreenMemory>        

      )
                    }}
      </UserInfoConsumer>
    );
  }
}

const styles = {
  subContainer: {
    alignItems: "center",
    justifyContent: 'center',
    flex:0.6,
  },

  circle: {
      width: 38,
      height: 38,
      borderRadius: 100 / 2,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      elevation:5,
      shadowColor: "#000",
          shadowOffset: { height: 1, width: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
    },


  socialLogins:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    paddingVertical:20
  },

  labelStyle  :{
        color:'#fff'
  },

  inputContainer:{
    borderBottomColor:'#fff',
    color:'#fff'
  },

  inputStyle:{
    color:'#fff',
    fontFamily: Fonts.regular,
  }
}

export default withNavigation(Login);
