import React from "react";
import './Card.css';
import Modal from '../Modal/Modal';

export default function Card(props) {
  if (props.pcdescription) {
    var slicedDescription = props.pcdescription.slice(0, 100);
   }
  return (
        <div className="card p-1 m-3 rounded-3 border border-black" style={{ width: '14rem' }}>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-uppercase" data-testid = "subtitle">{props.pcsubtitle}</h6>
            <h5 className="card-title border-bottom border-1" data-testid = "title">{props.pctitle}</h5>
            <p className="card-text" data-testid = "description">{slicedDescription}</p>
            <button type="button" className="btn card-btn rounded-pill" data-bs-toggle="modal" data-bs-target={"#CardModal" + props.id}>
              READ MORE
            </button>
            <div className="modal" id={"CardModal" + props.id}>
              <Modal
                key={props.id}
                id={props.id}
                pmsubtitle={props.pcsubtitle}
                pmtitle={props.pctitle}
                pmdescription={props.pcdescription}
              />
            </div>
          </div>
        </div>
  )
}