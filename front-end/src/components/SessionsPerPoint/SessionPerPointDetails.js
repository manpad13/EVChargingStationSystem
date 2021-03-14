import React from 'react'
import { Modal, Button } from 'react-bootstrap'


function SessionPerPointDetails(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Session Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Session Index: {props.session.SessionIndex}</h6>
        <h6>Session ID: {props.session.SessionID}</h6>
        <h6>Started On: {props.session.StartedOn}</h6>
        <h6>Finished On: {props.session.FinishedOn}</h6>
        <h6>Energy Delivered: {props.session.EnergyDelivered}</h6>
        <h6>Payment: {props.session.Payment}</h6>
        <h6>Vehicle Type: {props.session.VehicleType}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionPerPointDetails