import React from 'react'
import { Modal, Button } from 'react-bootstrap'


function SessionPerStationDetails(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Point Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Point ID: {props.session.PointID}</h6>
        <h6>Point Sessions: {props.session.PointSessions}</h6>
        <h6>Energy Delivered: {props.session.EnergyDelivered}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionPerStationDetails