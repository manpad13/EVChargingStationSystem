import React from 'react'

function PerPointHeader(props) {
  var top
  var length = props.data.NumberOfChargingSessions
  if (length === 0) {
    top = <h2>No sessions found for point ID {props.data.Point}</h2>
  } else if (length === 1) {
    top = <h2>1 session found for point ID {props.data.Point}</h2>
  } else {
    top = <h2>{length} sessions found for point ID {props.data.Point}</h2>
  }

  return (
    <div>
      {top}
      <br />
      <h5>Point Operator: {props.data.PointOperator}</h5>
      <h5>Request Timestamp: {props.data.RequestTimestamp}</h5>
      <h5>Period From: {props.data.PeriodFrom}</h5>
      <h5>Period To: {props.data.PeriodTo}</h5>
    </div>
  )
}

export default PerPointHeader
