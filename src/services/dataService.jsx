const API_URL = 'http://localhost:3001'; // Adjust the URL if different

export const fetchSchools = async () => {
  const response = await fetch(`${API_URL}/schools`);
  if (!response.ok) {
    throw new Error('Failed to fetch schools');
  }
  const data = await response.json();
  return data;
};

export const fetchInvoicesBySchool = async (schoolId) => {
  const response = await fetch(`${API_URL}/invoices?schoolId=${schoolId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch invoices for school ${schoolId}`);
  }
  const data = await response.json();
  return data;
};

export const fetchCollectionsByInvoice = async (invoiceId) => {
  const response = await fetch(`${API_URL}/collections?invoiceId=${invoiceId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch collections for invoice ${invoiceId}`);
  }
  const data = await response.json();
  return data;
};
