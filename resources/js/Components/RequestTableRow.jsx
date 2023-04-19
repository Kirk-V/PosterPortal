export default function RequestTableRow({ rowData, headers, handleClick }) {
    // console.log(`rowdata: ${JSON.stringify(rowData)}`);


    return (
        <tr onClick={() => handleClick(rowData)}>
            {Object.values(headers).map((cell, key) => <td key={key}>{eval(`rowData.${cell}`)}</td>)}
        </tr>
    );
}