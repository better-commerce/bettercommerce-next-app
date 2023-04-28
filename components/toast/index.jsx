import React from 'react';
import Toast from 'react-bootstrap/Toast';

function EditToast({ show, setShow, taxonomy, productCount, gridRef }) {
  return (
    <Toast
      onClose={() => {
        setShow(false);
        gridRef.api.deselectAll();
      }}
      show={show}
      delay={3000}
      style={{
        position: 'absolute',
        top: '50%',
        right: '50%',
        width: '35vh',
        backgroundColor: '#FFFFFF',
      }}
      autohide
    >
      <Toast.Header className="justify-content-between">
        <strong className="me-auto">Bootstrap</strong>
      </Toast.Header>
      <Toast.Body className="opacity-1">
        Updated {taxonomy} for {productCount} products
      </Toast.Body>
    </Toast>
  );
}

export default EditToast;
