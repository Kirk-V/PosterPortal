export default function JobsTableRow({ rowData, headers, handleClick }) {
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
        <tr onClick={() => handleClick(rowData)} className={rowColor()}>
            {Object.values(headers).map((cell, key) => <td key={key}>{eval(`rowData.${cell}`)}</td>)}
        </tr>
    );
}