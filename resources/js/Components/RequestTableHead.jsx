export default function RequestTableHead({headings}) {
    //fetch head columns here
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