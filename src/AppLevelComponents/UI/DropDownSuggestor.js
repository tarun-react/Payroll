import React, { Component } from "react";
import { View, FlatList, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";
import CustomText from "AppLevelComponents/UI/CustomText";
import { Colors } from "UIProps/Colors";
import HelperMethods from "Helpers/Methods";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton.js";

class DropDownSuggestor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSuggestion: "",
      data:undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    if(input == this.state.selectedSuggestion){
      this.setState({data:undefined})
    }
  }
  
  renderItem = ({ item, index }) => {
  
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectSuggestion(item.keyItem)}>

        <View style={{ padding: 5, paddingLeft: 13 }}>
          <CustomText size={14} text={item.keyItem} color={Colors.lightBlack} />
        </View>
        
      </TouchableWithoutFeedback>
    );
  };

  selectSuggestion(sugg) {
    const { setter } = this.props;
    this.setState({selectedSuggestion:sugg},()=>{
      setter(sugg);
    })
  }

  onBackPress = () => {
    if(this.props.data != undefined){
      this.props.hideDropDown()
    } else {
      return false
    }
  }


  renderSuggestor(){
    const {height,style,data,renderItem,hideSuggestions} = this.props
    let notFoundText  = <View/>

    if(data == undefined || hideSuggestions ){
      return <View/>
    } else if(data.length == 0){
      notFoundText = (<CustomText size={17} text={'No cities found'}  textAlign='center' color={Colors.lightBlack} />)
    }
    return(
      <View style={[styles.container,{maxHeight:height || 150,...style,}]}>
        {notFoundText}
        <FlatList
          extraData={this.state}
          data={data}
          keyboardShouldPersistTaps='always'
          renderItem={renderItem || this.renderItem }
          nestedScrollEnabled={true}
        />
       <BackHandlerSingleton onBackPress={this.onBackPress} />
      </View>
    )

  }
  render() {
    return (
      <>
      {this.renderSuggestor()}
      </>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderBottomLeftRadius:  8,
    borderBottomRightRadius: 8,
    elevation:5,
    shadowColor: "#000",
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
  }
};

export default withNavigation(DropDownSuggestor);
