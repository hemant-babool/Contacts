import React from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';


const Contact = props => {

    const deleteHandler = () => {
      Alert.alert("Warning!", "Do you really want to delete " + props.name, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => props.onDelete(props.id), style: "destructive" },
      ]);
    };

    const contactClickHandler = () => {
        props.contactClickHandler(props.id, props.name);
    }

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={contactClickHandler}>
        <View style={styles.container}>
          <Icon
            name="user"
            size={36}
            color={colors.iconColor}
            style={styles.userIcon}
          />
          <Text style={styles.name}> {props.name} </Text>
          <Icon.Button
            name="trash"
            size={24}
            color={colors.iconColor}
            style={styles.trashIcon}
            onPress={deleteHandler}
          />
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
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 6,
        shadowOpacity: 0.5,
        backgroundColor: colors.secondary
    },
    userIcon: {
        padding: 10
    },
    trashIcon: {
    //   padding: 10,
      backgroundColor: colors.secondary
    },
    name: {
        fontSize: 18,
        flex: 1
    }

});

export default Contact;