export default function RequestTableRow({ rowData }) {
    console.log(`rowdata: ${JSON.stringify(rowData)}`);
    function handleClick(){
        alert('clickked');
    }

    return (
        <tr onClick={handleClick}>
            {Object.values(rowData).map((cell, key) => <td key={key}>{cell}</td>)}
        </tr>
    );
}