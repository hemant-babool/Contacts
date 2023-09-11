import AsyncStorage from "@react-native-async-storage/async-storage";

const CONTACTS_KEY_NAME = 'contacts';

export const getAllContacts = async () => {
    try {
        const contactsJson = await AsyncStorage.getItem(CONTACTS_KEY_NAME);
        const contacts = contactsJson? JSON.parse(contactsJson): [];
        return contacts;
    } catch(error) {
        console.error('error in get allContacts');
        return [];
    }
};

export const addNewContact = async (newContact) => {
    try {
        const allContacts = await getAllContacts();
        const newAllContacts = [...allContacts, newContact];
        await AsyncStorage.setItem(CONTACTS_KEY_NAME, JSON.stringify(newAllContacts));
        console.log('new contact added newContact = ', JSON.stringify(newContact))
    } catch (error) {
        console.error('error in adding contact');
    }
};

export const deleteContact = async (contactId) => {
    try {
        const allContacts = await getAllContacts();
        const newAllContacts = allContacts.filter((contact) => contact.id !== contactId);
        await AsyncStorage.setItem(CONTACTS_KEY_NAME, JSON.stringify(newAllContacts));
        console.log('contact deleted successfully!')
    } catch(error) {
        console.error('error in deleting contact');
    }
}

export const updateContact = async (contactId, updatedContact) => {
  try {
    const allContacts = await getAllContacts();
    const newAllContacts = allContacts.map((contact) => contact.id === contactId ? updatedContact : contact);
    await AsyncStorage.setItem(CONTACTS_KEY_NAME, JSON.stringify(newAllContacts));
    console.log('update success!')
  } catch (error) {
    console.error("error in updating contact updateContactObj=",JSON.stringify(updatedContact));
  }
};
