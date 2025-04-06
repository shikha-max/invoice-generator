import React from 'react';
import { Modal  } from 'reactstrap';
import { OPEN_INVOICE_MODAL } from '../constants/modalConstant';
import InvoiceForm from '../Invoice/InvoiceForm';
const CustomModal = (props) => {
  const { modal } = props;
  const {  options,content } = modal;
  const { size, title } = options;
 
  const renderContent = () => {
      if(content){
          switch (content) {
              case OPEN_INVOICE_MODAL:
                  return <InvoiceForm {...props} />
              default:
                  break;
          }
      }
  }
  return (
    <Modal isOpen centered scrollable size={size}>
      <div className="modal-header">
        <h5 style={{color:"black", fontWeight:'bold'}} id="DMMODAL">
          {title}
        </h5>
      </div>
      {renderContent()}
    </Modal>
  );
};

export default CustomModal;
