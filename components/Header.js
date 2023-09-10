import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

const Header = props => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}> {props.title} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        height: 75,
        paddingTop: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'     
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    }
});

export default Header;