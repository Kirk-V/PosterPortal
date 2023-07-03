@if($poster->speed_code_approved)
    <p>This is an automated notice that a speed code payment has been approved for poster # {{ $poster->poster_id }}<p>
    <p>Please sign in to {{url("requests")}} to approve the poster job.</p>
@else
    <p>This is an automated notice that a speed code payment has been <strong>rejected</strong> for poster # {{ $poster->poster_id }}<p>
    <p>Please sign in to {{url("requests")}} to reject the poster job.</p>
@endif