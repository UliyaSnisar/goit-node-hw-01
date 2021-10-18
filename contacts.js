const fs = require('fs/promises')
const path = require('path');
const { stringify } = require('querystring');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts
    } catch (error) {
      throw error;
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts()
        const result = contacts.filter((contact) => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        throw error;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts()
        const result = contacts.filter((contact) => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        throw error
    }
}

async function addContact(name, email, phone) {
    try {
        const newContact = { name, email, phone, id: v4() }
        const contacts = await listContacts()
        contacts.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}