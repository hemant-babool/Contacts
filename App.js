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

  const initialContacts = getInitContactList() || [];

  const [isContactDetailEnabled, setIsContactDetailEnabled] = useState(false);
  const [contactList, setContactList] = useState(initialContacts);
  const [filteredContactList, setFilteredContactList] = useState(initialContacts);
  const [isAdd, setIsAdd] = useState(true);
  const [clickedContact, setClickedContact] = useState();  

  const addContactHandler = (id, enteredText) => {
    console.log('adding new name!', enteredText);
    const newContact = {id: id, name: enteredText};
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
    setIsAdd(true);
    setIsContactDetailEnabled(true);
  }

  const search = (searchText) => {   
    const filterArray = contactList.filter((contact) => {
      return contact.name.toLowerCase().includes(searchText.toLowerCase())
    });
    setFilteredContactList(filterArray);
  }

  const deleteHandler = (contactId) => {
    setContactList((contactList) => {
      return contactList.filter((contact) => contact.id !== contactId);
    });
    setFilteredContactList((filteredContactList) => {
      return filteredContactList.filter((contact) => contact.id !== contactId);
    })
  }

  const contactClickHandler = (contact) => {
    setIsAdd(false);
    setIsContactDetailEnabled(true);
    setClickedContact(contact);
  }

  const updateNameHandler = (contactId, updatedName) => {
    setIsContactDetailEnabled(false);
    setIsAdd(true);
    const newObj = {id: contactId, name: updatedName};
    const updatedContactList = contactList.map((contact) => {
      if(contact.id === contactId) { 
        return newObj; 
      } else {
        return contact;
      }
    });
    setContactList(updatedContactList);
    setFilteredContactList(updatedContactList);

  }

  let allContacts;
  if (!isContactDetailEnabled) {
    allContacts = (
      <FlatList
        data={filteredContactList}
        keyExtractor={(item, index) => item.id}
        renderItem={(contact) => (
          <Contact
            id={contact.item.id}
            name={contact.item.name}
            onDelete={deleteHandler}
            contactClickHandler={contactClickHandler}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Contacts" />
      <SearchBox
        onAddClick={addBtnClickHandler}
        placeHolder="Search contact"
        searchHandler={search}
      />
      <ContactDetail
        visible={isContactDetailEnabled}
        addContactHandler={addContactHandler}
        updateNameHandler={updateNameHandler}
        onCancel={cancelHandler}
        isAdd={isAdd}
        contact={clickedContact}
      />
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
