// src/components/Schools/SchoolDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInvoicesBySchool, fetchCollectionsByInvoice } from '../services/dataService';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../styles/SchoolDetails.css';


const SchoolDetails = () => {
  const { schoolId } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoicesData = await fetchInvoicesBySchool(schoolId);
      setInvoices(invoicesData);
    };

    getInvoices();
  }, [schoolId]);

  const getCollections = async (invoiceId) => {
    const collectionsData = await fetchCollectionsByInvoice(invoiceId);
    setCollections(collectionsData);
  };

  return (
    <div className="school-details-container">
      <Sidebar />
      <div className="school-details-content">
        <h1>School Details</h1>
        <h2>Invoices</h2>
        <ul>
          {invoices.map(invoice => (
            <li key={invoice.id}>
              <h3>Invoice Number: {invoice.invoiceNumber}</h3>
              <p>Items: {invoice.items.join(', ')}</p>
              <p>Creation Date: {invoice.creationDate}</p>
              <p>Due Date: {invoice.dueDate}</p>
              <p>Amount: ${invoice.amount}</p>
              <p>Paid Amount: ${invoice.paidAmount}</p>
              <p>Balance: ${invoice.balance}</p>
              <p>Status: {invoice.status}</p>
              <button onClick={() => getCollections(invoice.id)}>View Collections</button>
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
      </div>
      <Footer />
    </div>
  );
};

export default SchoolDetails;
