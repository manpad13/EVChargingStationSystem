import React from 'react'

function PerStationHeader(props) {
  var top
  var length = props.data.NumberOfChargingSessions
  if (length === 0) {
    top = <h2>No sessions found for station ID {props.data.StationID}</h2>
  } else if (length === 1) {
    top = <h2>1 session found for station ID {props.data.StationID}</h2>
  } else {
    top = <h2>{length} sessions found for station ID {props.data.StationID}</h2>
  }

  return (
    <div>
      {top}
      <br />
      <h5>Operator: {props.data.Operators[0]}</h5>
      <h5>Request Timestamp: {props.data.RequestTimestamp}</h5>
      <h5>Period From: {props.data.PeriodFrom}</h5>
      <h5>Period To: {props.data.PeriodTo}</h5>
      <h5>Total Energy Delivered: {props.data.TotalEnergyDelivered}</h5>
      <h5>Number Of Charging Sessions: {props.data.NumberOfChargingSessions}</h5>
      <h5>Number of Active Points: {props.data.NumberofActivePoints}</h5>
    </div>
  )
}

export default PerStationHeader
