import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';


const Contact = props => {

    return (
        <View style={styles.container}>
            <Icon name="user" size={36} color={colors.iconColor} style={styles.icon}/>
            <Text style={styles.name}> {props.name} </Text>
        </View>
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
    icon: {
        padding: 10
    },
    name: {
        fontSize: 18
    }

});

export default Contact;