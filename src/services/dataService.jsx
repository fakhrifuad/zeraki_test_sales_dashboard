// src/services/dataService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Fetches the list of schools
export const fetchSchools = async () => {
  const response = await fetch(`${API_URL}/schools`);
  if (!response.ok) {
    throw new Error('Failed to fetch schools');
  }
  const data = await response.json();
  return data;
};

// Fetches details of a specific school
export const fetchSchoolById = async (schoolId) => {
    const response = await fetch(`${API_URL}/schools/${schoolId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch school with id ${schoolId}`);
    }
    const data = await response.json();
    return data;
  };

// Fetches invoices for a specific school
export const fetchInvoicesBySchool = async (schoolId) => {
  const response = await fetch(`${API_URL}/invoices?schoolId=${schoolId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch invoices for school ${schoolId}`);
  }
  const data = await response.json();
  return data;
};

// Fetches collections for a specific invoice
export const fetchCollectionsByInvoice = async (invoiceId) => {
  const response = await fetch(`${API_URL}/collections?invoiceId=${invoiceId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch collections for invoice ${invoiceId}`);
  }
  const data = await response.json();
  return data;
};

// Creates a new invoice
export const createInvoice = async (invoice) => {
  const response = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoice),
  });
  if (!response.ok) {
    throw new Error('Failed to create invoice');
  }
  const data = await response.json();
  return data;
};

// Updates an existing invoice
export const updateInvoice = async (invoiceId, updatedFields) => {
  const response = await fetch(`${API_URL}/invoices/${invoiceId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error(`Failed to update invoice ${invoiceId}`);
  }
  const data = await response.json();
  return data;
};

// Deletes an invoice
export const deleteInvoice = async (invoiceId) => {
  const response = await fetch(`${API_URL}/invoices/${invoiceId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete invoice ${invoiceId}`);
  }
  return true;
};

// Adds a new collection
export const addCollection = async (collection) => {
  const response = await fetch(`${API_URL}/collections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(collection),
  });
  if (!response.ok) {
    throw new Error('Failed to add collection');
  }
  const data = await response.json();
  return data;
};
