import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icons from '../AppLevelComponents/UI/Icons'
import {Colors} from "UIProps/Colors";
const AddShiftBtn = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} >

        <View style={styles.circle} >
            <Icons lib='AntDesign' name='plus' color='#fff' size={29} />
        </View>
        </TouchableOpacity>
    )
}

const styles = {
    circle: {
        marginTop:30,
        width:  53,
        height: 53,
        borderRadius: 100 / 2,
        backgroundColor: Colors.accent,
        alignItems: "center",
        justifyContent: "center"
      },
}
export default AddShiftBtn
