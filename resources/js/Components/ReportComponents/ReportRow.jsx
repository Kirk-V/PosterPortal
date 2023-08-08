import React from 'react'
import ApproverReportCell from './ApproverReportCell'
import RequisitionerReportCell from './RequisitionerReportCell'

export default function ReportRow({data, handleRowClick}) {
    console.log(JSON.stringify(data));
  return (
    <tr onClick={()=> handleRowClick(data.poster_id, data)} role="button">
        <td>{data.transactions.transaction_date}</td>
        <td>{data.poster_id}</td>
        <td><RequisitionerReportCell FirstName={data.requests.first_name} LastName={data.requests.last_name} Email={data.requests.email}/></td>
        {data.requests.payment_method == 'speed_code' ? <td className='border-end'><ApproverReportCell  Name={data.requests.approver_name} Type={data.requests.payment_method} Email={data.requests.approver_email}/></td>: <td className='border-end'>-</td>}
        <td>{data.requests.payment_method == 'speed_code' ? `$${parseFloat(data.transactions.total)}`: null}</td>
        <td>{data.requests.payment_method == 'cash' ? `$${parseFloat(data.transactions.total_received).toFixed(2)}`: null}</td>
        <td>{parseFloat(data.discount).toFixed(2)}</td>
        <td>{parseFloat(data.transactions.total).toFixed(2)}</td>
    </tr>
  )
}
