import React from 'react'

export default function ReportRow({data}) {
  return (
    <tr>
        <td>{data.transactions.transaction_date}</td>
        <td>{data.poster_id}</td>
        <td>{data.requests.first_name} {data.requests.last_name}</td>
        <td>{data.requests.approver_name}</td>       
        <td>${data.requests.payment_method == 'speed_code' ? parseFloat(data.transactions.total): null}</td> 
        <td>${data.requests.payment_method == 'cash' ? parseFloat(data.transactions.total): null}</td>
        <td>{parseFloat(data.transactions.total).toFixed(2)}</td>      
        <td>{parseFloat(data.discount).toFixed(2)}</td> 
        <td>{parseFloat(data.transactions.total_received).toFixed(2)}</td> 
    </tr>
  )
}
