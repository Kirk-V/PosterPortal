export default function JobsTableRow({ rowData, headers, handleClick }) {
    // console.log(`rowdata: ${JSON.stringify(rowData)}`);

    function rowColor(){
        // if(rowData.requests.payment_method == 'speedcode' && rowData.speed_code_approved == '1')
        // {
        //     return 'table-danger'
        // }
        return 'table-danger';
    }
    return (
        <tr onClick={() => handleClick(rowData)} className={rowColor()}>
            {Object.values(headers).map((cell, key) => <td key={key}>{eval(`rowData.${cell}`)}</td>)}
        </tr>
    );
}