@if(strTolower($poster->requests->payment_method) == "speed_code")
    <p>An email will also be sent to $grantHolderEmail for a speedcode and authorization to charge the grant.</p>
@endif

<html><body>
<p>This is an automated notification that {{$poster->requests->first_name}} {{$poster->requests->last_name}} ({{$poster->requests->email}}) has requested the printing of the Poster(s) following details:</p>
<p>Dimensions: {{$poster->width}} x {{$poster->height}} ({{$poster->units}})</p>
<p>Cost Per Poster: ${{$poster->cost}}</p>
<p>Quantity: {{$poster->quantity}}</p>
<p>Total: ${{ number_format((float)($poster->cost * $poster->quantity), 2, '.', '' )}}</p>
@if(strTolower($poster->requests->payment_method) == "speed_code")
    <p>Payment Method: Speed Code</p>
@else
    <p>Payment Method: Speed Code</p>
@endif

Please note that the above cost is subject to change if the Requisitioner increases/decreases the poster dimensions.

<p>If any formatting issues etc. preventing the printing of your poster, we will provide an email explanation and notify you that the issue must be resolved before we can print the poster.</p>
<p>You will receive an email regarding the progress of your poster(s) for the following occurences:</p>
<ul>
    <li>When the poster has been placed in the queue for printing.</li>
    <li>When the poster has been printed.</li>
    <li>When the poster is ready to pick up.</li>
    <li>An email receipt for your records.</li>
</ul>
    
    <p>If you did not request this service or wish to cancel, please reply to this email to notify SSTS staff.</p>
    <p>If you have any questions/concerns please reply to this email or contact Social Science Technology Services at 519-661-2152 or Ext. 82152</p>
    </body></html>
