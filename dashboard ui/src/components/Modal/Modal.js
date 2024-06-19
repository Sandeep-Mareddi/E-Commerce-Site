import React from 'react';
import './Modal.css';

export default function Modal(props) {
  const handleClose = () => {
    if(props.onClose){
      props.onClose();
    }
  }
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <div className='d-flex flex-column'>
            <h6 className="modal-subtitle text-uppercase">{props.pmsubtitle}</h6>
            <h4 className="modal-title">{props.pmtitle}</h4>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
        </div>
        <div className="modal-body">
          <p>{props.pmdescription}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn modal-btn rounded-pill" data-bs-dismiss="modal" onClick={handleClose}>CLOSE</button>
        </div>
      </div>
    </div>
  )
}