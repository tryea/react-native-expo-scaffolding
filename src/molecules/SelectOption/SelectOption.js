import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Easing, Keyboard, Animated, KeyboardAvoidingView } from 'react-native';
import Color from '../../utils/Colors';
import ScaleSize from '../../utils/ScaleSize';
import Sleep from '../../utils/Sleep';


const SelectOption = ({ options, placeholder, hasSearch, validation = () => { return true }, onChange = () => { } }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [optionsHeight] = useState(new Animated.Value(0));
    const maxItemShow = 3;

    const [prevSelectedValue, setPrevSelectedValue] = useState('');
    const [prevSelectedText, setPrevSelectedText] = useState('');

    const textInputRef = useRef();


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            backgroundColor: 'white',
            marginVertical: ScaleSize['10']
        },
        selectContainer: {
            // styles for the select container
            flexDirection: 'row',
            height: ScaleSize['48'],
            width: '100%',
            paddingVertical: ScaleSize['10'],
            paddingHorizontal: ScaleSize['14'],
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: ScaleSize['1'],
            borderColor: Color.Brand,
            borderRadius: ScaleSize['6'],
        },
        selectedText: {
            flex: 1,
        },
        selectText: {
            // styles for the selected option text
        },
        dropdownIconContainer: {
            // styles for the dropdown icon container
            marginLeft: ScaleSize['48'],
            width: ScaleSize['24'],
            alignItems: 'flex-end'
        },
        dropdownIcon: {
            // styles for the dropdown icon
        },
        optionsContainer: {
            // styles for the options container
            width: '100%',
            marginTop: ScaleSize['6'],
            borderColor: Color.Brand,
            borderRadius: ScaleSize['6'],
            overflow: 'hidden'

        },
        optionContainer: {
            // styles for each option container
            flex: 1,
            paddingHorizontal: ScaleSize['14'],
            height: ScaleSize['48'],
            justifyContent: 'center',
            borderBottomWidth: ScaleSize['1'],
            borderBottomColor: Color.Brand,

        },
        optionText: {
            // styles for the option text
        },
        searchTextInput: {
            height: ScaleSize['48']
        }
    });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSelect = (option) => {
        setSelectedValue(option.value);
        setSelectedText(option.label);
        setPrevSelectedText(option.label)
        setPrevSelectedValue(option.value)

        onChange(option)
        // setIsExpanded(false);
        handleOpenClose()
    };

    const handleOpenClose = (isExpandedConst) => {
        console.log({ isExpandedConst });
        const newIsExpandedValue = isExpandedConst !== undefined && isExpanded !== null ? isExpandedConst : !isExpanded
        console.log(newIsExpandedValue);
        if (newIsExpandedValue) {
            Animated.timing(optionsHeight, {
                toValue: ScaleSize['48'] * maxItemShow, // Change this value to the desired height of the options container
                duration: 350,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

            setIsExpanded(newIsExpandedValue);

        } else {
            // Hide options container
            Animated.timing(optionsHeight, {
                toValue: 0,
                duration: 350,
                useNativeDriver: false,
            }).start();

            Sleep(350).then(() => {
                Keyboard.dismiss();
                setIsExpanded(newIsExpandedValue);
            })

        }
    };

    const filteredOptions = Array.isArray(options) ? options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} style={styles.selectContainer} onPress={handleOpenClose}>
                <View style={styles.selectedText}>
                    {
                        hasSearch ? (
                            <TextInput
                                ref={textInputRef}
                                placeholder="Search options"
                                onChangeText={handleSearch}
                                value={searchQuery}
                                style={styles.searchTextInput}
                                onPressIn={() => {
                                    handleOpenClose()
                                }}
                                onBlur={() => {
                                    handleOpenClose(false)
                                }}
                            />
                        ) : (<Text style={styles.selectText}>{selectedText || placeholder}</Text>)
                    }

                </View>
                <View style={styles.dropdownIconContainer}>
                    <Text style={[styles.dropdownIcon, { color: Color.Brand }]}>&#9660;</Text>
                </View>
            </TouchableOpacity>

            <Animated.View
                style={[
                    styles.optionsContainer,
                    {
                        maxHeight: optionsHeight,
                        borderWidth: !isExpanded ? 0 : ScaleSize['1']
                    }
                ]}
            >
                <FlatList
                    style={{ height: '100%', width: '100%' }}
                    data={filteredOptions}
                    scrollEnabled
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={[
                                styles.optionContainer,
                                {
                                    borderBottomWidth: index === filteredOptions.length - 1 ? 0 : ScaleSize['1']
                                }
                            ]}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.value}
                />
            </Animated.View>
        </View>
    );
};

export default SelectOption;
