import React from 'react'
import { Stack } from 'react-bootstrap'

export default function ApproverReportCell({Name, Type, Email}) {
  return (
    <Stack >
        <div>{Name ?? 'N/A'}</div>
        <div>{Type ?? 'N/A'} </div>
        <div>{Email ?? 'N/A'} </div>
    </Stack>
  )
}
