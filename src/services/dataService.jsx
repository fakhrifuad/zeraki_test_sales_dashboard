// src/services/dataService.js
import { database } from '../firebaseConfig';
import { ref, get, child, set, update, remove, query, orderByChild, equalTo } from 'firebase/database';

// Fetches the list of schools
export const fetchSchools = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, 'schools'));
  if (!snapshot.exists()) {
    throw new Error('No schools found');
  }
  return snapshot.val();
};

// Fetches details of a specific school
export const fetchSchoolById = async (schoolId) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `schools/${schoolId}`));
  if (!snapshot.exists()) {
    throw new Error(`No school found with id ${schoolId}`);
  }
  return snapshot.val();
};

// Fetches invoices for a specific school
export const fetchInvoicesBySchool = async (schoolId) => {
  const invoicesRef = query(ref(database, 'invoices'), orderByChild('schoolId'), equalTo(schoolId.toString()));
  const snapshot = await get(invoicesRef);
  if (!snapshot.exists()) {
    throw new Error(`No invoices found for school ${schoolId}`);
  }
  const invoices = snapshot.val();
  return Object.values(invoices); // Convert to array
};

// Fetches collections for a specific invoice
export const fetchCollectionsByInvoice = async (invoiceId) => {
  const collectionsRef = query(ref(database, 'collections'), orderByChild('invoiceId'), equalTo(invoiceId));
  const snapshot = await get(collectionsRef);
  if (!snapshot.exists()) {
    throw new Error(`No collections found for invoice ${invoiceId}`);
  }
  return snapshot.val();
};

// Creates a new invoice
export const createInvoice = async (invoice) => {
  const newInvoiceRef = ref(database, `invoices/${invoice.id}`);
  await set(newInvoiceRef, invoice);
  const snapshot = await get(newInvoiceRef);
  if (!snapshot.exists()) {
    throw new Error('Failed to create invoice');
  }
  return snapshot.val();
};

// Updates an existing invoice
export const updateInvoice = async (invoiceId, updatedFields) => {
  const invoiceRef = ref(database, `invoices/${invoiceId}`);
  await update(invoiceRef, updatedFields);
  const snapshot = await get(invoiceRef);
  if (!snapshot.exists()) {
    throw new Error(`Failed to update invoice ${invoiceId}`);
  }
  return snapshot.val();
};

// Deletes an invoice
export const deleteInvoice = async (invoiceId) => {
  const invoiceRef = ref(database, `invoices/${invoiceId}`);
  await remove(invoiceRef);
  const snapshot = await get(invoiceRef);
  if (snapshot.exists()) {
    throw new Error(`Failed to delete invoice ${invoiceId}`);
  }
  return true;
};

// Adds a new collection
export const addCollection = async (collection) => {
  const newCollectionRef = ref(database, `collections/${collection.id}`);
  await set(newCollectionRef, collection);
  const snapshot = await get(newCollectionRef);
  if (!snapshot.exists()) {
    throw new Error('Failed to add collection');
  }
  return snapshot.val();
};
