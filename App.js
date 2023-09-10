import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

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
  const [clickedName, setClickedName] = useState('');
  const [clickedId, setClickedId] = useState(Math.random().toString());

  const addContactHandler = (id, enteredText) => {
    const newContact = {id: id, name: enteredText};
    setContactList((contactList) => [
      ...contactList, newContact 
    ])
    setIsContactDetailEnabled(false);
    setFilteredContactList([...contactList, newContact]);
  }

  const cancelHandler = () => {
    setClickedId(Math.random().toString());
    setClickedName('');
    setIsAdd(true);
    setIsContactDetailEnabled(false);
  }

  const addBtnClickHandler = () => {
    setClickedId(Math.random().toString());
    setClickedName('');
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

  const contactClickHandler = (clickedId, clickedName) => {
    setClickedId(clickedId);
    setClickedName(clickedName);
    setIsAdd(false);
    setIsContactDetailEnabled(true);
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
            contactClickHandler={()=> contactClickHandler(contact.item.id, contact.item.name)}
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
        name={clickedName}
        id={clickedId}
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
