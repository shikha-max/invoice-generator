import React from 'react';
import { connect } from 'react-redux';
import CustomModal from '../components/Modal';

function ModalContainer({invoice,dispatch}) {
  const { modal } = invoice;
  if (modal.length === 0 ) {
    return null;
  }
  return (
    <>
      {modal.map((modelKey,ind) => <CustomModal key={ind} dispatch={dispatch} modal={modelKey} invoice={invoice} />)}
    </>
  );
}

function mapStateToProps(state) {
  const { invoice } = state;
  return { invoice };
}

export default connect(mapStateToProps)(ModalContainer);
