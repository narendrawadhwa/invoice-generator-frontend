import React from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDetails from './components/InvoiceDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<InvoiceForm />}/>
          <Route path="/invoice-details/:orderNo" element={<InvoiceDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
