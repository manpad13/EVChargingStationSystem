import React from 'react'
import { Modal, Button } from 'react-bootstrap'


function SessionPerEVDetails(props) {
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
        <h6>Energy Provider: {props.session.EnergyProvider}</h6>
        <h6>Started On: {props.session.StartedOn}</h6>
        <h6>Finished On: {props.session.FinishedOn}</h6>
        <h6>Energy Delivered: {props.session.EnergyDelivered}</h6>
        <h6>Price Policy Ref: {props.session.PricePolicyRef}</h6>
        <h6>Cost Per KWh: {props.session.CostPerKWh}</h6>
        <h6>Session Cost: {props.session.SessionCost}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionPerEVDetails