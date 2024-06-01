import React, { useEffect, useState } from 'react';
import { fetchSchools, fetchInvoicesBySchool, fetchCollectionsByInvoice } from '../services/dataService';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [totalCollections, setTotalCollections] = useState(0);
  const [totalSignUps, setTotalSignUps] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bouncedCheques, setBouncedCheques] = useState(0);

  const [analyticsSignups, setAnalyticsSignups] = useState(0);
  const [financeSignups, setFinanceSignups] = useState(0);
  const [timetableSignups, setTimetableSignups] = useState(0);

  const [schoolSignups, setSchoolSignups] = useState({
    analytics: { primary: 0, secondary: 0, igcse: 0 },
    finance: { primary: 0, secondary: 0, igcse: 0 },
    timetable: { primary: 0, secondary: 0, igcse: 0 },
  });

  const analyticsTarget = 100;
  const financeTarget = 100;
  const timetableTarget = 100;

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schools = await fetchSchools();
        console.log('Fetched schools:', schools);

        const invoicesPromises = schools.map(school => fetchInvoicesBySchool(school.id));
        const invoices = await Promise.all(invoicesPromises);
        console.log('Fetched invoices:', invoices);

        let collections = [];
        for (const invoiceArray of invoices) {
          if (invoiceArray) {
            const collectionPromises = invoiceArray.map(invoice => fetchCollectionsByInvoice(invoice.id));
            const collectionsArray = await Promise.all(collectionPromises);
            collections = collections.concat(...collectionsArray);
          }
        }
        console.log('Fetched collections:', collections);

        setTotalCollections(collections.length);
        setTotalSignUps(schools.length);
        setTotalRevenue(invoices.flat().reduce((sum, invoice) => sum + (invoice ? invoice.paidAmount : 0), 0));
        setBouncedCheques(collections.filter(collection => collection.status === 'Bounced').length);

        const analytics = { primary: 0, secondary: 0, igcse: 0 };
        const finance = { primary: 0, secondary: 0, igcse: 0 };
        const timetable = { primary: 0, secondary: 0, igcse: 0 };

        schools.forEach(school => {
          if (school.product === 'Zeraki Analytics') {
            if (school.type === 'Primary') analytics.primary++;
            if (school.type === 'Secondary') analytics.secondary++;
            if (school.type === 'IGCSE') analytics.igcse++;
          } else if (school.product === 'Zeraki Finance') {
            if (school.type === 'Primary') finance.primary++;
            if (school.type === 'Secondary') finance.secondary++;
            if (school.type === 'IGCSE') finance.igcse++;
          } else if (school.product === 'Zeraki Timetable') {
            if (school.type === 'Primary') timetable.primary++;
            if (school.type === 'Secondary') timetable.secondary++;
            if (school.type === 'IGCSE') timetable.igcse++;
          }
        });

        console.log('Analytics signups:', analytics);
        console.log('Finance signups:', finance);
        console.log('Timetable signups:', timetable);

        setSchoolSignups({
          analytics,
          finance,
          timetable,
        });

        setAnalyticsSignups(analytics.primary + analytics.secondary + analytics.igcse);
        setFinanceSignups(finance.primary + finance.secondary + finance.igcse);
        setTimetableSignups(timetable.primary + timetable.secondary + timetable.igcse);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const renderPieChart = (achieved, target, name) => (
    <PieChart width={400} height={400}>
      <Pie
        data={[
          { name: 'Achieved', value: achieved },
          { name: 'Remaining', value: target - achieved }
        ]}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {[
          { name: 'Achieved', value: achieved },
          { name: 'Remaining', value: target - achieved }
        ].map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );

  const renderBarChart = (data, name) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Primary" stackId="a" fill={COLORS[0]} onClick={() => console.log(`${name} Primary details`)} />
        <Bar dataKey="Secondary" stackId="a" fill={COLORS[1]} onClick={() => console.log(`${name} Secondary details`)} />
        <Bar dataKey="IGCSE" stackId="a" fill={COLORS[2]} onClick={() => console.log(`${name} IGCSE details`)} />
      </BarChart>
    </ResponsiveContainer>
  );

  const analyticsData = [
    { type: 'Zeraki Analytics', Primary: schoolSignups.analytics.primary, Secondary: schoolSignups.analytics.secondary, IGCSE: schoolSignups.analytics.igcse }
  ];
  const financeData = [
    { type: 'Zeraki Finance', Primary: schoolSignups.finance.primary, Secondary: schoolSignups.finance.secondary, IGCSE: schoolSignups.finance.igcse }
  ];
  const timetableData = [
    { type: 'Zeraki Timetable', Primary: schoolSignups.timetable.primary, Secondary: schoolSignups.timetable.secondary, IGCSE: schoolSignups.timetable.igcse }
  ];

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

        {/* Pie Charts for Targets */}
        <div className="charts_container">
          <h2>Signup Targets</h2>
          <div className="chart">
            <h3>Zeraki Analytics</h3>
            {renderPieChart(analyticsSignups, analyticsTarget, 'Zeraki Analytics')}
          </div>
          <div className="chart">
            <h3>Zeraki Finance</h3>
            {renderPieChart(financeSignups, financeTarget, 'Zeraki Finance')}
          </div>
          <div className="chart">
            <h3>Zeraki Timetable</h3>
            {renderPieChart(timetableSignups, timetableTarget, 'Zeraki Timetable')}
          </div>
        </div>

        {/* Bar Charts for Signups */}
        <div className="charts_container">
          <h2>Signups Overview</h2>
          <div className="chart">
            <h3>Zeraki Analytics</h3>
            <div className='graph_container'>
              {renderBarChart(analyticsData, 'Zeraki Analytics')}

            </div>
          </div>
          <div className="chart">
            <h3>Zeraki Finance</h3>
            {renderBarChart(financeData, 'Zeraki Finance')}
          </div>
          <div className="chart">
            <h3>Zeraki Timetable</h3>
            {renderBarChart(timetableData, 'Zeraki Timetable')}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
