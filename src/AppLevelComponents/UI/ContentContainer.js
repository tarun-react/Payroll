import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { ContentConsumer } from "AppLevelComponents/Contexts/CxtBoardContent";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";

class ContentContainer extends Component {

  render() {
    const {style} = this.props
    return (
      <View style={styles.card}>
        <ContentConsumer>
          {context => {
            return (
              <View style={{ flex:1,width:'100%',...style}}>
              <ScrollView
                contentContainerStyle={{
                  // flex: 1,
                  width: "100%",
                  // padding: 14,
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >
                {this.props.children}
              </ScrollView>
              </View>
            );
          }}
        </ContentConsumer>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,
  $borderRadius: 20,

  card: {
    flex: 1,
    backgroundColor: Colors.contentCard,
    marginBottom: "8rem",
    borderBottomLeftRadius: "$borderRadius",
    borderBottomRightRadius: "$borderRadius",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1
  }
});
export default withNavigation(ContentContainer);
