import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../../design/colors';

const Button = ({ title, onPress, style, type }) => {
    const color = type === 'Primary' ? colors.PrimaryColor : {}

    return (
        <TouchableOpacity onPress={onPress} style={[style.button, style, color]}>
            <Text style={style.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
};

export default Button;
