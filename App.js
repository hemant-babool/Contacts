import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import SearchBox from './components/SearchBox';
import Contact from './components/Contact';
import ContactDetail from './components/ContactDetail';

const getInitContactList = () => {
  return [
    {id: Math.random().toString(), name: 'Shubhman Gill'},
    {id: Math.random().toString(), name: 'Rohit Sharma'},
    {id: Math.random().toString(), name: 'Virat Kohli'}
  ];
}

export default function App() {

  const [isContactDetailEnabled, setIsContactDetailEnabled] = useState(false);
  const [contactList, setContactList] = useState(getInitContactList());
  

  const addContactHandler = (enteredText) => {
    console.log('adding new name!', enteredText);
    setContactList((contactList) => [
      ...contactList, {id: Math.random().toString(), name: enteredText}
    ])
    setIsContactDetailEnabled(false);
  }

  const cancelHandler = () => {
    console.log('cancel Button Clicked!')
    setIsContactDetailEnabled(false);
  }

  const addNewContactHandler = () => {
    console.log('addNewContactHandler clicked!')
    setIsContactDetailEnabled(true);
  }

  let allContacts;
  if (!isContactDetailEnabled) {
    allContacts = (
      <FlatList
        data={contactList}
        keyExtractor = {(item, index) => item.id}
        renderItem={(contact) => <Contact id={contact.item.id} name={contact.item.name} />}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Contacts"/>
      <SearchBox onAddClick={addNewContactHandler} placeHolder="Search contact"/>
      <ContactDetail visible={isContactDetailEnabled} addContactHandler={addContactHandler} onCancel={cancelHandler} />
      {allContacts}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
