export default function RequestTableRow({ requestData }) {
    return (
        <tr>
            <td>{requestData.first_name}</td>
            <td>{requestData.last_name}</td>
            <td>{requestData.request_id}</td>
        </tr>
    );
}