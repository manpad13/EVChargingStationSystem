import React from 'react'
import { Modal, Button } from 'react-bootstrap'


function SessionPerProviderDetails(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Session Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Provider Name: {props.session.ProviderName}</h6>
        <h6>Station ID: {props.session.StationID}</h6>
        <h6>Session ID: {props.session.SessionID}</h6>
        <h6>Vehicle ID: {props.session.VehicleID}</h6>
        <h6>Started On: {props.session.StartedOn}</h6>
        <h6>Finished On: {props.session.FinishedOn}</h6>
        <h6>Energy Delivered: {props.session.EnergyDelivered}</h6>
        <h6>Cost Per KWh: {props.session.CostPerKWh}</h6>
        <h6>Total Cost: {props.session.TotalCost}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionPerProviderDetails