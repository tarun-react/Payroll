import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import Header from 'AppLevelComponents/UI/Header';
import Constants from 'Helpers/Constants';
import ShiftListContainer from 'PayrollComponents/ShiftListContainer';
import CustomText from 'AppLevelComponents/UI/CustomText';
import ViewAllBtn from 'PayrollComponents/ViewAllBtn';
import ClockInOutBtns from 'PayrollComponents/ClockInOutBtns';
import FilterBtn from '../../PayrollComponents/FilterBtn';


let data=[
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    {name:'Lester law', shiftNumber:'231' ,date:'08/08/2019',time:'7am - 3pm'},
    
]

export class AllShifts extends Component {
    render() {
        return (
            <>
        <Header
          title="all shifts"
        />
        <Container>
        <View style={{width:'100%',}} >
        <View style={styles.titleTextContainer} >

            <CustomText text='All shifts' color='#000' style={{}} />
            <FilterBtn />
        </View>
            <ShiftListContainer data={data} />
        </View>
        </Container>
      </>
        )
    }
}

const styles = {
    titleTextContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:20
    }
}

export default AllShifts
