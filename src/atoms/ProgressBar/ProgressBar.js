import { View, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../../utils/Colors';
import ScaleSize from '../../utils/ScaleSize';
import { CustomText } from '../CustomText';

const ProgressBar = ({ progress, count }) => {
    const bars = Array(count).fill(0);
    const percentageEachBar = 100 / count;

    const barFilled = Math.floor(progress / percentageEachBar)

    const percentageLeft = progress % percentageEachBar

    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
        text: {
            marginBottom: ScaleSize['14'],
        },
        rowContainer: {
            width: '100%',
            flexDirection: 'row',
        },
        bar: {
            borderColor: Color.Brand,
            borderWidth: ScaleSize['1'],
            height: ScaleSize['10'],
            flex: 1,
            marginRight: ScaleSize['10'],
        },
        filledBar: {
            backgroundColor: Color.Brand,
        },
        emptyBar: {
            backgroundColor: Color.White,
        },
    });

    return (
        <View
            style={styles.container}
        >
            <CustomText style={{ marginBottom: ScaleSize['14'] }}>{progress}% Data terisi</CustomText>
            <View
                style={[styles.container, { flexDirection: 'row' }]}
            >
                {bars.map((_, index) => {
                    const barMargin = {
                        marginRight: index < (count - 1) ? ScaleSize['10'] : 0
                    }

                    if (index < barFilled) {
                        return (
                            <View
                                key={`bar-${index}`}
                                style={
                                    [
                                        styles.bar,
                                        styles.filledBar,
                                        barMargin
                                    ]
                                }
                            >
                            </View>
                        )
                    } else if (index === barFilled && percentageLeft > 0) {
                        return (
                            <LinearGradient
                                key={`bar-${index}`}
                                colors={[Color.Brand, Color.Brand, Color.White]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: percentageLeft / percentageEachBar, y: 0.5 }}
                                style={[
                                    styles.bar,
                                    barMargin
                                ]}
                            >
                            </LinearGradient>
                        )
                    } else {
                        return (
                            <View
                                key={`bar-${index}`}
                                style={[
                                    styles.bar,
                                    styles.emptyBar,
                                    barMargin
                                ]}
                            >
                            </View>
                        )
                    }
                })}
            </View>
        </View>
    )
};


export default ProgressBar