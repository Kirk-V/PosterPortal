import React from 'react'

export default function ReportTableBottomRow({ totals }) {
    console.log(JSON.stringify(totals));
    return (
        <>
            <tr className="table-group-divider">
                <td colSpan={2}>Totals</td>
                <td></td>
                <td></td>
                <td>{totals?.grant.toFixed(2)}</td>
                <td>{totals?.cash.toFixed(2)}</td>
                <td>{totals?.total.toFixed(2)}</td>
                <td>{totals?.SDF.toFixed(2)}</td>
                <td>{totals?.received.toFixed(2)}</td>
            </tr>
            <tr className="table-warning">
                <td colSpan={5}>Check: Grant + cash - discount</td>
                <td>grant: {totals?.grant.toFixed(2)}</td>
                <td>+ cash: {totals?.cash.toFixed(2)}</td>
                <td>+ discount: {totals?.SDF.toFixed(2)}</td>
                <td>= {(totals?.grant + totals?.cash + totals?.SDF).toFixed(2)}</td>
            </tr>

        </>

    )
}
