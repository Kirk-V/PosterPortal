<html>
    <body>
        <p>Social Science Technology Services has received your poster printing request.</p>

@if($poster->file_location == '')
    <p>PLEASE REPLY TO THIS EMAIL WITH YOUR POSTER FILE(S) ATTACHED.</p>
    <p><strong>PDF FILE REQUIRED</strong>. A PowerPoint file (if available) can also be submitted as a secondary file.</p>
@else
    <p>You have selected to share your file through <strong>OneDrive</strong>, there is no need to reply to this email.</p>
@endif

@if(strTolower($poster->requests->payment_method) == "speed_code")
    <p>An automated email will be sent to the specified account approver {{$poster->requests->approver_email }} for Speedcode authorization.</p>
@endif

<p>You will receive automated emails during the printing process to keep you informed and updated on the progress of your poster. You will receive a final email when the poster is ready to be picked up, including total cost, building, room number and available office hours.</p>

<li>Poster #{{$poster->poster_id}}</li>
<li>Dimensions: {{$poster->width}} x {{$poster->height}} ({{$poster->units}})</li>
<li>Cost Per Poster: ${{$poster->cost}}</li>
<li>Quantity: {{$poster->quantity}}</li>
@if(strTolower($poster->requests->payment_method) == "speed_code")
    <li>Total: ${{ number_format((float)($poster->cost * $poster->quantity), 2, '.', '' )}}</li>
@else
    <li>Total: ${{ number_format(floor((float)($poster->cost * $poster->quantity)), 2, '.', '' )}}</li>
@endif

<li>Payment Method: {{$poster->requests->payment_method}}</li>


<p>Please note that the above cost is subject to change if the Requisitioner increases/decreases the poster dimensions.
    <br/>If you did not request this service or wish to cancel, please reply to this email to notify SSTS staff.
    <br/>If you have any questions/concerns please reply to this email or contact Social Science Technology Services at 519-661-2152 or Ext. 82152</p>
</body></html>
