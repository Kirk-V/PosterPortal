import React from 'react'
import { Stack } from 'react-bootstrap'


export default function RequisitionerReportCell({FirstName, LastName, Email}) {
  return (
    <Stack>
        <div>{FirstName ?? '-'} {LastName ?? '-'}</div>
        <div>{Email ?? '-'}</div>
    </Stack>
  )
}
