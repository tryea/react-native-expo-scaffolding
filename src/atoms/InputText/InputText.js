import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { CustomText } from '../CustomText'
import ScaleSize from '../../utils/ScaleSize'
import Color from '../../utils/Colors'

const InputText = (
    {
        horizontalView = false, labelText, placeholderText,
        inputTextStyle = {}, inputContainerStyle = {}, value,
        onChangeText
    }
) => {
    const style = StyleSheet.create({
        inputTextStyle: {
            height: ScaleSize['48'],
            borderRadius: ScaleSize['6'],
            backgroundColor: Color.LightGrayBrand,
            paddingHorizontal: ScaleSize['12'],
            fontSize: ScaleSize['16'],
            fontFamily: 'Raleway_Regular'
        },
        inputContainerStyle: {
            flexDirection: horizontalView ? 'row' : 'column',
            marginBottom: ScaleSize['10'],
        }
    })

    return (
        <View style={[style.inputContainerStyle, { ...inputContainerStyle }]}>
            {labelText ? (<CustomText>{labelText}</CustomText>) : (<></>)}
            <TextInput
                placeholder={placeholderText}
                value={value}
                onChangeText={onChangeText}
                style={[style.inputTextStyle, inputTextStyle]} />
        </View>
    )
}

export default InputText