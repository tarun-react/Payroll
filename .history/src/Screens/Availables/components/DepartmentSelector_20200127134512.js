import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Colors} from 'UIProps/Colors';
import HelperMethods from 'Helpers/Methods';
import {
  addShift,
  getShiftTimings,
  getDepartments,
} from 'ServiceProviders/ApiCaller';
import CustomText from 'AppLevelComponents/UI/CustomText';
import DropDownSuggestor from '../../../AppLevelComponents/UI/DropDownSuggestor';
class DepartmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: '',
      data: [],
      openSuggestor: false,
      openOutletSuggestor: false,
      outlets: [],
      firstOutlet: '',
    };
  }

  componentWillMount() {
    this.fetchDepartments();
  }

  fetchDepartments() {
    const {staffId} = this.props || {};
    getDepartments(staffId)
      .then(resp => {
        let firstDep = resp.message.department[0].dept;
        let firstDepId = firstDep.departmentID;
        this.props.depIdGetter(firstDepId);
        alerstr
        const {outlet} = resp.message;
        let firstOutlet = outlet[0].name;
        let firstOutletId = outlet[0].outletID;

        this.props.updateTimings(firstOutletId)
        this.setState({
          data: resp.message.department,
          firstOutlet,
          firstOutletId,
          outlets: outlet,
          department: !this.state.department ? firstDep : this.state.department,
        });
      })
      .catch(err => {});
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectDepartment(item.departmentID, item.dept)}>
        <View style={{padding: 5, paddingLeft: 13}}>
          <CustomText size={14} text={item.dept} color={Colors.lightBlack} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderOutlets = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectOutlet(item.outletID, item.name)}>
        <View style={{padding: 5, paddingLeft: 13}}>
          <CustomText size={14} text={item.name} color={Colors.lightBlack} />
        </View>
      </TouchableWithoutFeedback>
    );
  };


  selectDepartment(id, department) {
    HelperMethods.animateLayout();
    this.props.depIdGetter(id);
    this.setState({department, openSuggestor: false},()=>{
      this.fetchDepartments()
    });
  }

  selectOutlet(id, outlet) {
    HelperMethods.animateLayout();
    this.props.updateTimings(id)
    this.setState({firstOutlet:outlet, openOutletSuggestor: false});
  }


  openSuggestor = () => {
    HelperMethods.animateLayout();
    this.setState({openSuggestor: !this.state.openSuggestor});
  };

  openOutletSuggestor = () => {
    HelperMethods.animateLayout();
    this.setState({openOutletSuggestor: !this.state.openOutletSuggestor});
  };

  render() {
    return (
      <>
        <View style={styles.shiftSelector}>
          <CustomText
            text="Department(s): "
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
                style={{backgroundColor: Colors.cardBackground}}
              />
            )}

       
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
              text={this.state.firstOutlet}
              onPress={this.openOutletSuggestor}
              color={Colors.accent}
              size={15}
              style={{marginTop: 28}}
            />

            {this.state.openOutletSuggestor && (
              <DropDownSuggestor
                data={this.state.outlets}
                hideDropDown={this.hideDropDown}
                hideSuggestions={!this.state.openOutletSuggestor}
                renderItem={this.renderOutlets}
                style={{backgroundColor: Colors.cardBackground}}
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
};

export default DepartmentSelector;
