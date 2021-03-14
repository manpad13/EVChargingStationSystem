import React from 'react'

function PerEVHeader(props) {
  var top
  var length = props.data.NumberOfVehicleChargingSessions
  if (length === 0) {
    top = <h2>No sessions found for vehicle ID {props.data.vehicleID}</h2>
  } else if (length === 1) {
    top = <h2>1 session found for vehicle ID {props.data.vehicleID}</h2>
  } else {
    top = <h2>{length} sessions found for vehicle ID {props.data.vehicleID}</h2>
  }

  return (
    <div>
      {top}
      <br />
      <h5>Vehicle Type: {props.data.vehicleType}</h5>
      <h5>Request Timestamp: {props.data.RequestTimestamp}</h5>
      <h5>Period From: {props.data.PeriodFrom}</h5>
      <h5>Period To: {props.data.PeriodTo}</h5>
      <h5>Total Energy Consumed: {props.data.TotalEnergyConsumed}</h5>
      <h5>Number Of Visited Points: {props.data.NumberOfVisitedPoints}</h5>
    </div>
  )
}

export default PerEVHeader
