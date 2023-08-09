import React from 'react'

export default function ReportTableHead() {
  return (
    <thead>
      <tr>
          <th className="text-center border-end border-top border-bottom-0" colSpan={4}>Information</th>
          <th className="text-center border-bottom-0 border-top border-end" colSpan={3}>Payment</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Poster #</th>
          <th>Requisitioner</th>
          <th className="border-end">Approver</th>
          <th>Account</th>
          <th>Cash Received</th>
          <th className="border-end">SDF Journal</th>
          <th>Poster Total</th>
        </tr>
    </thead>
  )
}
