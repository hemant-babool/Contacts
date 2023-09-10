import React, { useState }  from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBox = props => {

    const [searchText, setSearchText] = useState('');

    const searchHandler = (searchText) => {
        setSearchText(searchText);
        props.searchHandler(searchText);
    }

    const addBtnHandler = () => {
        setSearchText('');
        props.onAddClick();
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
            value={searchText}
          />
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={addBtnHandler}
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
        justifyContent: 'space-around',
        
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
        fontSize: 14,
        width: '90%',
        color: 'black',
    },
    addButtonContainer: {
        marginRight: 10
    }
});

export default SearchBox;