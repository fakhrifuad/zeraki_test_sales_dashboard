import React, { useEffect, useState } from 'react';
import { fetchSchools, fetchInvoicesBySchool, fetchCollectionsByInvoice } from '../services/dataService';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [totalCollections, setTotalCollections] = useState(0);
  const [totalSignUps, setTotalSignUps] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bouncedCheques, setBouncedCheques] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schools = await fetchSchools();
        const invoicesPromises = schools.map(school => fetchInvoicesBySchool(school.id));
        const invoices = await Promise.all(invoicesPromises);

        let collections = [];
        for (const invoiceArray of invoices) {
          const collectionPromises = invoiceArray.map(invoice => fetchCollectionsByInvoice(invoice.id));
          const collectionsArray = await Promise.all(collectionPromises);
          collections = collections.concat(...collectionsArray);
        }

        setTotalCollections(collections.length);
        setTotalSignUps(schools.length);
        setTotalRevenue(invoices.flat().reduce((sum, invoice) => sum + invoice.paidAmount, 0));
        setBouncedCheques(collections.filter(collection => collection.status === 'Bounced').length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_container">
        <div className="dashboard_cards">
          <div className="card">Total Revenue: ${totalRevenue}</div>
          <div className="card">Collections: {totalCollections}</div>
          <div className="card">Sign-ups: {totalSignUps}</div>
          <div className="card">Bounced Cheques: {bouncedCheques}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
