import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBox = props => {

    const searchHandler = (searchText) => {
        console.log('seaching... search text=', searchText);
        props.searchHandler(searchText);
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={24}
            color={colors.iconColor}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder={props.placeHolder}
            onChangeText={searchHandler}
          />
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={props.onAddClick}
        >
          <Icon name="plus" size={30} color="black" style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inputContainer: {
        height: 50,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.iconColor,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '85%'
    },
    icon: {
        marginRight: 10,
    },
    input: {
        color: 'black',
    },
    addButtonContainer: {
        marginRight: 10
    }
});

export default SearchBox;