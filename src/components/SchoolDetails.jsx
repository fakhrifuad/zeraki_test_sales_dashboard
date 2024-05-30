import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSchoolById, fetchInvoicesBySchool, fetchCollectionsByInvoice, createInvoice, updateInvoice, deleteInvoice, addCollection } from '../services/dataService';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../styles/SchoolDetails.css';

const SchoolDetails = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [collections, setCollections] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [newInvoice, setNewInvoice] = useState({ items: [], amount: '', dueDate: '' });
  const [newCollection, setNewCollection] = useState({ invoiceId: '', amount: '', status: 'Valid' }); // Default to 'Valid'

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
    setNewCollection({ invoiceId: '', amount: '', status: 'Valid' }); // Reset to default status
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
        <div>
          {filteredInvoices.map(invoice => (
            <div key={invoice.id}>
              <table className='invoice_details'>
                <tbody>
                  <tr>
                    <td>Invoice Number:</td>
                    <td>{invoice.invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td>Items:</td>
                    <td>{invoice.items.join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Creation Date:</td>
                    <td>{invoice.creationDate}</td>
                  </tr>
                  <tr>
                    <td>Due Date:</td>
                    <td>{invoice.dueDate}</td>
                  </tr>
                  <tr>
                    <td>Amount:</td>
                    <td>${invoice.amount}</td>
                  </tr>
                  <tr>
                    <td>Paid Amount:</td>
                    <td>${invoice.paidAmount}</td>
                  </tr>
                  <tr>
                    <td>Balance:</td>
                    <td>${invoice.balance}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>{invoice.status}</td>
                  </tr>
                  <tr>
                    <td>Days Until Due:</td>
                    <td>{/* Calculate days until due */}</td>
                  </tr>
                </tbody>
              </table>
              <div className='invoice_buttons'>
                <button onClick={() => getCollections(invoice.id)} className='add_button'>View Collections</button>
                <button onClick={() => handleDeleteInvoice(invoice.id)} className='delete_button'>Delete Invoice</button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Invoice */}
        <h2>Create Invoice</h2>
        <div className='add_info_container'>
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
        <div className='add_info_container'>
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
          <select
            value={newCollection.status}
            onChange={(e) => setNewCollection({ ...newCollection, status: e.target.value })}
          >
            <option value="Valid">Valid</option>
            <option value="Bounced">Bounced</option>
          </select>
          <button onClick={handleAddCollection} className='add_button'>Add Collection</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolDetails;
