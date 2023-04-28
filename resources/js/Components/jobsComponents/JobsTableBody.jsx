import JobsTableRow from "@/Components/jobsComponents/JobsTableRow";
// Takes an array of json objects as data
export default function JobsTableBody({data, onRowClick, headers}) {
    console.log("making body");
    return (
        <tbody>
            {data.map( (row, key) => {
                console.log(`row: ${JSON.stringify(row)}`);
                return <JobsTableRow key={key} rowData={row} headers={headers} handleRowClick={onRowClick}/>
            })}

        </tbody>
    );
}
