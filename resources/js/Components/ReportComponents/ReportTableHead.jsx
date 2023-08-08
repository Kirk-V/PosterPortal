import React from 'react'

export default function ReportTableHead() {
  return (
    <thead>
      <tr>
          <th className="text-center border-end border-top border-bottom-0" colSpan={4}>Information</th>
          <th className="text-center border-bottom-0 border-top" colSpan={4}>Payment</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Poster #</th>
          <th>Requisitioner</th>
          <th className="border-end">Approver</th>
          <th>Grant</th>
          <th>Cash</th>
          <th>SDF Discount</th>
          <th>Total</th>
        </tr>
    </thead>
  )
}
