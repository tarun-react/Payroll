import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CustomButton from 'AppLevelComponents/UI/CustomButton';
export class ViewAllBtn extends Component {



    render() {
        const {onPress} = this.props
        return (
            <CustomButton
            onPress={onPress}
            text="View All"
            width={'33%'}
            containerStyle={{alignSelf:'center',marginVertical:20,}}
            />
        )
    }
}

export default ViewAllBtn
