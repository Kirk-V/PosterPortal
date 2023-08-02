import React from 'react'
import ApproverReportCell from './ApproverReportCell'
import RequisitionerReportCell from './RequisitionerReportCell'

export default function ReportRow({data}) {
  return (
    <tr>
        <td>{data.transactions.transaction_date}</td>
        <td>{data.poster_id}</td>
        <td><RequisitionerReportCell FirstName={data.requests.first_name} LastName={data.requests.last_name} Email={data.requests.email}/></td>
        {data.requests.payment_method == 'speed_code' ? <td><ApproverReportCell/></td>: <td>-</td>}     
        <td>{data.requests.payment_method == 'speed_code' ? `$${parseFloat(data.transactions.total)}`: null}</td> 
        <td>{data.requests.payment_method == 'cash' ? `$${parseFloat(data.transactions.total)}`: null}</td>
        <td>{parseFloat(data.transactions.total).toFixed(2)}</td>      
        <td>{parseFloat(data.discount).toFixed(2)}</td> 
        <td>{parseFloat(data.transactions.total_received).toFixed(2)}</td> 
    </tr>
  )
}
