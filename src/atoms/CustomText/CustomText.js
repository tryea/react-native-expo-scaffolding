import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScaleSize from '../../utils/ScaleSize'
import Color from '../../utils/Colors'

/**
 * 
 * @param {{
 * numberOfLines: Number | undefined ,
*  style: import('react-native').StyleProp<import('react-native').TextStyle>
*  
*  }} props 
* @returns {import('react').FunctionComponent}
*/
const CustomText = ({ children, style = {}, onPress = () => { } }) => {
  const customTextStyle = StyleSheet.create({
    text: {
      fontFamily: 'Raleway_Regular',
      ...style
    }
  })

  return (
    <Text style={customTextStyle.text} onPress={onPress}>{children}</Text>
  )
}

export default CustomText