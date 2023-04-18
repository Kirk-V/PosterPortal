export default function RequestTableRow({ rowData }) {
    console.log(JSON.stringify(rowData));
    return (
        <tr>
            {rowData.map((cell, key) => <td key={key}>{cell}</td>)}
        </tr>
    );
}