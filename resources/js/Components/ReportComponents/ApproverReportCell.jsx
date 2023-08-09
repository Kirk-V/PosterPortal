import React from 'react'
import { Stack } from 'react-bootstrap'

export default function ApproverReportCell({Name, Department, Email}) {
  return (
    <Stack >
        <div>{Name ?? 'N/A'}</div>
        <div>{Department ?? 'N/A'}</div>
        <div>{Email ?? 'N/A'} </div>
    </Stack>
  )
}
