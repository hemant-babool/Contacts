import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, View, Button } from 'react-native';

const ContactDetail = props => {

    const [enteredName, setEnteredName] = useState('');

    const addBtnHandler = () => {
        if(enteredName.length === 0) {
            return;
        }
        props.addContactHandler(enteredName);
        setEnteredName('');
    }

    const nameChangeHandler = (enteredText) => {
        setEnteredName(enteredText);
    }

    return (
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter name"
            style={styles.input}
            onChangeText={nameChangeHandler}
            value={enteredName}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="CANCEL" color="red" onPress={props.onCancel} />
            </View>
            <View style={styles.button}>
              <Button title="ADD" onPress={addBtnHandler} />
            </View>
          </View>
        </View>
      </Modal>
    );

}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "black",
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default ContactDetail;