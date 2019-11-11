import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CustomButton from 'AppLevelComponents/UI/CustomButton';
export class FilterBtn extends Component {



    render() {
        const {onPress} = this.props
        return (
            <CustomButton
            onPress={this.onPress}
            text="Filter"
            width="40%"
            containerStyle={{alignSelf:'flex-end',height:30}}
            buttonStyle={{height:30}}
            borderRadius={1}
            />
        )
    }
}

export default FilterBtn
