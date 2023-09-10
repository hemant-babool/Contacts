import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';


const Contact = props => {

    return (
        <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.container}>
                <Icon name="user" size={36} color={colors.iconColor} style={styles.userIcon}/>
                <Text style={styles.name}> {props.name} </Text>
                <Icon name="trash" size={36} color={colors.iconColor} style={styles.trashIcon}/>
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6,
        alignItems: 'center',
        margin: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: colors.secondary
    },
    userIcon: {
        padding: 10
    },
    trashIcon: {
      padding: 10  
    },
    name: {
        fontSize: 18,
        flex: 1
    }

});

export default Contact;