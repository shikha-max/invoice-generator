import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import {  INVOICES, INVOICES_DETAULS } from '../constants/routeConstant';
import InvoiceForm from './InvoiceForm';
import Invoices from './Invoices';
import Sidebar from './Sidebar';
import Viewinvoice from './Viewinvoice';
function Index() {

  const renderRoutes = () => {

    return (
      <Suspense fallback={(
        <Loader />
      )}
      >
        <Routes>
          <Route path={INVOICES_DETAULS} element={<Viewinvoice />} />
          <Route path={INVOICES} element={<Invoices />} />
          <Route path={"*"} element={<Invoices
            objectVal={{
              sender: 'Acme Inc.',
              receiver: 'John Doe',
              mail: 'john@example.com',
              currDate: '2025-04-06',
              terms: 'Net 30',
              due: '2025-05-06',
              tax: 10,
              discount: 10,
              shipping: 35,
              paid: 0,
              notes: 'Thanks for your business',
              conditions: 'Payment due in 30 days.',
              lineItems: [
                { description: 'Product A', quantity: 1, rate: 100 },
                { description: 'Product B', quantity: 2, rate: 50 },
              ]
            }}
            autoFill={true}

          />
          } />
        </Routes>
      </Suspense>
    );
  }
  return (
    <div id="layout-wrapper">

      <Sidebar

      />
      <div className="main-content">
        <div className="page-content">
          {renderRoutes()}
        </div>
      </div>
    </div>
  );
}

export default Index;