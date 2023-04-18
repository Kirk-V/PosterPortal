import RequestTableRow from "./RequestTableRow";

export default function RequestTableBody({data}) {
    console.log("making body");
    console.log(json.parse(data));
    return (
        <tbody>
            {data.map( (row, key) => (
                <RequestTableRow key={key} data={row}/>
                )
            )}
        </tbody>
    );
}