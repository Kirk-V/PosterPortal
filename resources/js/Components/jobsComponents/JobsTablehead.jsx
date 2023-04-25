export default function JobsTableHead({headings}) {
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