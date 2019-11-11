import React, {Component} from 'react';
import {
  SafeAreaView,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import 'Helpers/global';
import HelperMethods from 'Helpers/Methods';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from 'UIProps/Colors';
import BackHandlerSingleton from 'ServiceProviders/BackHandlerSingleton';
import {withNavigation} from 'react-navigation';
export default class Container extends Component {
  state = {
    refreshing: false,
  };
  renderForIOS() {
    let {padding, style, contentPadding, scroll} = this.props;
    return (
      <>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.accent, color: '#fff'}}
        />
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.contentCard}}>
          <StatusBar translucent={true} barStyle="light-content" />
          <ScrollView
            nestedScrollEnabled
            scrollEnabled={scroll}
            style={[styles.container, {...style}]}
            contentContainerStyle={{
              alignItems: 'center',
              ...style,
              padding: padding == 0 ? 0 : 15 * global.rem,
            }}
            keyboardShouldPersistTaps="always">
            {this.props.children}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  onRefresh = () => {
    this.props.onRefresh();
  };

  renderForAndroid() {
    let {padding, style, contentPadding, scroll, onRefresh} = this.props;
    scroll = scroll ? scroll : true;
    return (
      <>
        <StatusBar backgroundColor={Colors.accent} barStyle="light-content" />
        <ScrollView
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                title="Pull to refresh"
              />
            ) : (
              undefined
            )
          }
          nestedScrollEnabled
          scrollEnabled={scroll}
          style={[
            styles.container,
            {
              padding: padding * global.rem || 0 * global.rem,
              backgroundColor: '#fff',
              ...style,
            },
          ]}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            ...style,
            padding: padding == 0 ? 0 : 15 * global.rem,
          }}
          keyboardShouldPersistTaps="always">
          {this.props.children}
        </ScrollView>
      </>
    );
  }

  render() {
    return (
      <>
        {<BackHandlerSingleton onBackPress={this.props.onBackPress} />}
        {HelperMethods.isPlatformAndroid()
          ? this.renderForAndroid()
          : this.renderForIOS()}
      </>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: '100%',
  $rem: global.rem,

  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },

  contentContainerStyle: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: '10rem',
  },
});
