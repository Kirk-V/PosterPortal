export default function RequestTableRow({ rowData, handleClick }) {
    console.log(`rowdata: ${JSON.stringify(rowData)}`);
    return (
        <tr onClick={() => handleClick(rowData)}>
            {Object.values(rowData).map((cell, key) => <td key={key}>{cell}</td>)}
        </tr>
    );
}