import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';

function Viewinvoice({invoice}) {
    const {invoiceList} = invoice
    const { id } = useParams();
    console.log(invoiceList[id])
    return (
       <InvoiceForm autoFill={true} objectVal={invoiceList[id]} />
    );
}


function mapStateToProps(state) {
    const { invoice } = state;
    return { invoice };
  }
  export default connect(mapStateToProps)(Viewinvoice);