import React from 'react'

export default function ReportRow({data}) {
  return (
    <tr>
        <td>{data.transaction_date}</td>
        <td>{data.poster_id}</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>${data.total_received}</td>
    </tr>
  )
}
