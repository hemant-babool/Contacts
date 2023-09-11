import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';

import Header from './components/Header';
import SearchBox from './components/SearchBox';
import Contact from './components/Contact';
import ContactDetail from './components/ContactDetail';
import { getAllContacts, addNewContact, deleteContact, updateContact } from './services/Storage';

export default function App() {

  const [isContactDetailEnabled, setIsContactDetailEnabled] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [clickedName, setClickedName] = useState('');
  const [clickedId, setClickedId] = useState(Math.random().toString());

  useEffect(() => {
    getAllContacts().then((contactList) => {
      setContactList(contactList);
      setFilteredContactList(contactList);
    })
  }, [])

  const addContactHandler = (id, enteredText) => {
    const newContact = { id: id, name: enteredText };
    addNewContact(newContact)
      .then(() => {
        getAllContacts().then((contacts) => {
          setContactList(contacts);
          setFilteredContactList(contacts);
          setIsContactDetailEnabled(false);
        });
      })
      .catch((error) =>
        console.log("some error in adding new contact!", error)
      );
  };

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
    deleteContact(contactId)
      .then(() => {
        getAllContacts().then((contacts) => {
          setContactList(contacts);
          setFilteredContactList(contacts);
          setIsContactDetailEnabled(false);
        });
      })
      .catch((error) =>
        console.error("some error in deleting contactId=", contactId, error)
      );
  };

  const contactClickHandler = (clickedId, clickedName) => {
    setClickedId(clickedId);
    setClickedName(clickedName);
    setIsAdd(false);
    setIsContactDetailEnabled(true);
  }

  const updateNameHandler = (contactId, updatedName) => {
    const newObj = {id: contactId, name: updatedName};
    updateContact(contactId, newObj).then(() => {
      getAllContacts().then((contacts) => {
        setContactList(contacts);
        setFilteredContactList(contacts);
        setIsContactDetailEnabled(false);
        setIsAdd(true);
      });
    })
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
