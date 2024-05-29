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
        <h1>Dashboard</h1>
        <div className="dashboard_cards">
          <div className="card"><h2>{totalRevenue} /= </h2><span>Total Revenue</span></div>
          <div className="card"><h2>{totalCollections}</h2><span>Collections</span></div>
          <div className="card"><h2>{totalSignUps}</h2><span>Sign-ups</span></div>
          <div className="card"><h2>{bouncedCheques}</h2><span>Bounced Cheques</span> </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
