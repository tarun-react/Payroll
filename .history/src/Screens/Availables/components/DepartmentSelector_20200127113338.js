import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {Colors} from "UIProps/Colors";
import HelperMethods from 'Helpers/Methods'
import {addShift,getShiftTimings,getDepartments} from 'ServiceProviders/ApiCaller'
import CustomText from 'AppLevelComponents/UI/CustomText'
import DropDownSuggestor from '../../../AppLevelComponents/UI/DropDownSuggestor';
class DepartmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
        department:'',
        data:[],
        openSuggestor:false,
        openOutletSuggestor:false,
        outlets:[],
        firstOutlet:''
    };
  }

  componentWillMount(){
    this.fetchDepartments()
  }

  fetchDepartments(){
    const {staffId} = this.props || {}
       getDepartments(staffId).then(resp => {
        let firstDep = resp.message.department[0].dept
        let firstDepId = firstDep.departmentID

        const {}

          this.props.depIdGetter(firstDepId)
         this.setState({data:resp.message.department,firstOutlet:r,outlets:resp.message.outlet,department:firstDep})
         
       }).catch(err => {
       })
 }

 renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectDepartment(item.departmentID,item.dept)}
      >
        <View style={{ padding: 5, paddingLeft: 13 }}>
          <CustomText
            size={14}
            text={item.dept}
            color={Colors.lightBlack}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  selectDepartment(id,department){
    HelperMethods.animateLayout()
    this.props.depIdGetter(id)
    this.setState({department,openSuggestor:false,})
  }

  openSuggestor = () => {
    HelperMethods.animateLayout();
    this.setState({ openSuggestor: !this.state.openSuggestor });
  }


  openOutletSuggestor = () => {
    HelperMethods.animateLayout();
    this.setState({ openOutletSuggestor: !this.state.openOutletSuggestor });
  }


  render() {
    return (
      <>
      <View style={styles.shiftSelector}>
              <CustomText
                text="Departments: "
                color={Colors.lightBlack}
                size={15}
                style={{marginTop: 28}}
              />

              <View>
                <CustomText
                  text={this.state.department}
                  onPress={this.openSuggestor}
                  color={Colors.accent}
                  size={15}
                  style={{marginTop: 28}}
                />

              {this.state.openSuggestor && (
                <DropDownSuggestor
                  data={this.state.data}
                  hideDropDown={this.hideDropDown}
                  hideSuggestions={!this.state.openSuggestor}
                  renderItem={this.renderItem}
                  style={{backgroundColor:Colors.cardBackground}}
                />
              )}

              <DropDownSuggestor
                  data={this.state.data}
                  hideDropDown={this.hideDropDown}
                  hideSuggestions={!this.state.openSuggestor}
                  renderItem={this.renderItem}
                  style={{backgroundColor:Colors.cardBackground}}
                />


              </View>
            </View>

                
            <View style={styles.shiftSelector}>
              <CustomText
                text="Outlet(s): "
                color={Colors.lightBlack}
                size={15}
                style={{marginTop: 28}}
              />

              <View>
                <CustomText
                  text={this.state.outlet}
                  onPress={this.openOutletSuggestor}
                  color={Colors.accent}
                  size={15}
                  style={{marginTop: 28}}
                />

              {this.state.openSuggestor && (
                <DropDownSuggestor
                  data={this.state.outlets}
                  hideDropDown={this.hideDropDown}
                  hideSuggestions={!this.state.openSuggestor}
                  renderItem={this.renderItem}
                  style={{backgroundColor:Colors.cardBackground}}
                />
              )}
              </View>
            </View>



            </>

    );
  }
}

const styles = {
    shiftSelector: {
        flexDirection: 'row',
      },
}

export default DepartmentSelector;
