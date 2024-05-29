import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInvoicesBySchool, fetchCollectionsByInvoice, fetchSchoolById, createInvoice, updateInvoice, deleteInvoice, addCollection } from '../services/dataService';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../styles/SchoolDetails.css';

const SchoolDetails = () => {
  const { schoolId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [school, setSchool] = useState('');
  const [collections, setCollections] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [newInvoice, setNewInvoice] = useState({ items: [], amount: '', dueDate: '' });
  const [newCollection, setNewCollection] = useState({ invoiceId: '', amount: '', status: '' });


  useEffect(() => {
    const getSchoolDetails = async () => {
      const schoolData = await fetchSchoolById(schoolId);
      setSchool(schoolData);
    };

    const getInvoices = async () => {
      const invoicesData = await fetchInvoicesBySchool(schoolId);
      setInvoices(invoicesData);
    };

    getSchoolDetails();
    getInvoices();
  }, [schoolId]);

  const getCollections = async (invoiceId) => {
    const collectionsData = await fetchCollectionsByInvoice(invoiceId);
    setCollections(collectionsData);
  };

  const handleCreateInvoice = async () => {
    const invoice = await createInvoice({ ...newInvoice, schoolId });
    setInvoices([...invoices, invoice]);
    setNewInvoice({ items: [], amount: '', dueDate: '' });
  };

  const handleUpdateInvoice = async (invoiceId, updatedFields) => {
    const updatedInvoice = await updateInvoice(invoiceId, updatedFields);
    setInvoices(invoices.map(inv => (inv.id === invoiceId ? updatedInvoice : inv)));
  };

  const handleDeleteInvoice = async (invoiceId) => {
    await deleteInvoice(invoiceId);
    setInvoices(invoices.filter(inv => inv.id !== invoiceId));
  };

  const handleAddCollection = async () => {
    const collection = await addCollection(newCollection);
    setCollections([...collections, collection]);
    setNewCollection({ invoiceId: '', amount: '', status: '' });
    // Update invoice status based on new collection
    handleUpdateInvoice(newCollection.invoiceId, { status: 'Updated' }); // Adjust logic as needed
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'completed') return invoice.status === 'Completed';
    if (filter === 'pending') return invoice.status === 'Pending';
    return true;
  });

  return (
    <div className="school-details-container">
      <Sidebar />
      <div className="school-details-content">
      <h1>{school.name}</h1> {/* Display the school name */}

        {/* Filter Invoices */}
        <div>
          <label>Filter Invoices: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* List Invoices */}
        <h2>Invoices</h2>
        <ul>
          {filteredInvoices.map(invoice => (
            <li key={invoice.id}>
              <div className='invoice_details'>
                <h3><span>Invoice Number:</span> {invoice.invoiceNumber}</h3>
                <p><span>Items:</span> {invoice.items.join(', ')}</p>
                <p><span>Creation Date:</span> {invoice.creationDate}</p>
                <p><span>Due Date:</span> {invoice.dueDate}</p>
                <p><span>Amount:</span> ${invoice.amount}</p>
                <p><span>Paid Amount:</span> ${invoice.paidAmount}</p>
                <p><span>Balance:</span> ${invoice.balance}</p>
                <p><span>Status:</span> {invoice.status}</p>
                <p><span>Days Until Due:</span> {/* Calculate days until due */}</p>
                <div className='invoice_buttons'>
                    <button onClick={() => getCollections(invoice.id)} className='add_button'>View Collections</button>
                    <button onClick={() => handleDeleteInvoice(invoice.id)} className='delete_button'>Delete Invoice</button>
                </div>
              </div>
              
              {/* Update Invoice form can be added here */}
              <ul>
                {collections.filter(collection => collection.invoiceId === invoice.id).map(collection => (
                  <li key={collection.id}>
                    <p>Collection Number: {collection.collectionNumber}</p>
                    <p>Date: {collection.date}</p>
                    <p>Amount: ${collection.amount}</p>
                    <p>Status: {collection.status}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Create Invoice */}
        <h2>Create Invoice</h2>
        <div>
          <input
            type="text"
            placeholder="Items"
            value={newInvoice.items}
            onChange={(e) => setNewInvoice({ ...newInvoice, items: e.target.value.split(',') })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newInvoice.amount}
            onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
          />
          <input
            type="date"
            placeholder="Due Date"
            value={newInvoice.dueDate}
            onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
          />
          <button onClick={handleCreateInvoice} className='add_button'>Create Invoice</button>
        </div>

        {/* Add Collection */}
        <h2>Add Collection</h2>
        <div>
          <input
            type="text"
            placeholder="Invoice ID"
            value={newCollection.invoiceId}
            onChange={(e) => setNewCollection({ ...newCollection, invoiceId: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newCollection.amount}
            onChange={(e) => setNewCollection({ ...newCollection, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={newCollection.status}
            onChange={(e) => setNewCollection({ ...newCollection, status: e.target.value })}
          />
          <button onClick={handleAddCollection} className='add_button'>Add Collection</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolDetails;
