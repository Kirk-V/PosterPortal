import RequestTableRow from "./RequestTableRow";
// Takes an array of json objects as data
export default function RequestTableBody({data, handleRowClick, headers, courses}) {
    console.log("making body");
    return (
        <tbody>
            {data.map( (row, key) => {
                // console.log(`row: ${JSON.stringify(row)}`);
                return <RequestTableRow key={key} rowData={row} headers={headers} handleClick={handleRowClick}/>
            })}
                
        </tbody>
    );
}