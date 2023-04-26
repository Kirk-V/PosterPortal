export default function RequestTableRow({ rowData, headers, handleClick }) {
    // console.log(`rowdata: ${JSON.stringify(rowData)}`);

    function rowColor(){
        if(rowData.requests.payment_method == 'speedcode' && rowData.speed_code_approved == '1')
        {
            return 'table-danger';
        }
        if(rowData.requests.payment_method == "cash" && rowData.state == 'ready')
        {
            return 'table-danger';
        }
    }
    return (
        <tr onClick={() => handleClick(rowData)} className={rowColor()}>
            {Object.values(headers).map((cell, key) => <td key={key}>{eval(`rowData.${cell}`)}</td>)}
        </tr>
    );
}