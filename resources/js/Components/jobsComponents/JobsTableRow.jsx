export default function JobsTableRow({ rowData, headers, handleRowClick }) {
    // console.log(`rowdata: ${JSON.stringify(rowData)}`);

    function rowColor(){
        switch (rowData.state)
        {
            case 'printed':
                return 'table-success';
                break;
            case 'on_hold':
                return 'table-warning';
            case 'in_queue':
                return 'table-danger';
            default:
                return 'table-secondary';
        }
    }
    return (
        <tr onClick={() => handleRowClick(rowData)} className={rowColor()}>
            {Object.values(headers).map((cell, key) => <td key={key}>{eval(`rowData.${cell}`)}</td>)}
        </tr>
    );
}