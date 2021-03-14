import React from 'react'

function PerProviderHeader(props) {
  var top
  var length = props.data.length
  if (length === 0) {
    top = <h2>No sessions found for provider ID {props.data[0].ProviderID}</h2>
  } else if (length === 1) {
    top = <h2>1 session found for provider ID {props.data[0].ProviderID}</h2>
  } else {
    top = <h2>{length} sessions found for provider ID {props.data[0].ProviderID}</h2>
  }

  return (
    <div>
      {top}
    </div>
  )
}

export default PerProviderHeader
