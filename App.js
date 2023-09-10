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
  const [filteredContactList, setFilteredContactList] = useState([...contactList]);
  

  const addContactHandler = (enteredText) => {
    console.log('adding new name!', enteredText);
    const newContact = {id: Math.random().toString(), name: enteredText};
    setContactList((contactList) => [
      ...contactList, newContact 
    ])
    setIsContactDetailEnabled(false);
    setFilteredContactList([...contactList, newContact]);
  }

  const cancelHandler = () => {
    console.log('cancel Button Clicked!')
    setIsContactDetailEnabled(false);
  }

  const addBtnClickHandler = () => {
    console.log('addNewContactHandler clicked!')
    setIsContactDetailEnabled(true);
  }

  const search = (searchText) => {   
    const filterArray = contactList.filter((contact) => {
      return contact.name.toLowerCase().includes(searchText.toLowerCase())
    });
    setFilteredContactList(filterArray);

    console.log('contactList = ', contactList)
    console.log('filteredList = ', filterArray)
  }

  let allContacts;
  if (!isContactDetailEnabled) {
    allContacts = (
      <FlatList
        data={filteredContactList}
        keyExtractor = {(item, index) => item.id}
        renderItem={(contact) => <Contact id={contact.item.id} name={contact.item.name} />}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Contacts"/>
      <SearchBox onAddClick={addBtnClickHandler} placeHolder="Search contact" searchHandler={search}/>
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
