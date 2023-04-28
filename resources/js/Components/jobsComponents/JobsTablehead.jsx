export default function JobsTableHead({headings}) {
    console.log("Making head");
    return (
        <thead>
            <tr>
                {Object.keys(headings).map((v, key) =>
                    (
                        <th key={key}>{v}</th>
                    ))}
            </tr>
        </thead>
    );
}
