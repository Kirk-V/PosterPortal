import RequestTableRow from "./RequestTableRow";
// Takes an array of json objects as data
export default function RequestTableBody({data, handleRowClick}) {
    console.log("making body");
    return (
        <tbody>
            {data.map( (row, key) => {
                // console.log(`row: ${JSON.stringify(row)}`);
                return <RequestTableRow key={key} rowData={row} handleClick={handleRowClick}/>
            })}
                
        </tbody>
    );
}