<html><body>
<p>Please Approve/Deny the payment by filling out the information <a href="{{url('/approve?id='.$poster->poster_id)}}"><strong style="font-size: 20px">here</strong></a></p>
<p>This is an automated notification that {{  $poster->requests->first_name}} {{  $poster->requests->last_name}} ({{ $poster->requests->email}}) has requested the printing of a poster(s) by SSTS and identified you as the grant holder (or authorized designate) to approve the payment.</p>
<p>We require a valid speedcode from you to approve the printing of the following poster(s). The poster printing status will remain "on hold" until we receive the return email authorization.</p>
<p>Department: {{  $poster->requests->department}}</p>
<p>Dimensions: {{  number_format((float)($poster->width), 2, '.', '')}} x {{  number_format((float)($poster->height), 2, '.', '')}} ({{ $poster->units}})</p>
<p>Cost Per Poster: ${{$poster->cost}}</p>
<p>Quantity: {{$poster->quantity}}</p>
<p>Total: ${{ number_format((float)($poster->cost * $poster->quantity), 2, '.', '' )}}</p>


<p>Please note that the above cost is subject to change if the Requisitioner increases/decreases the poster dimensions etc.</p>
<p>If you did not request this poster or wish to cancel, please reply to this email to notify SSTS staff.</p>
<p>If you have any questions/concerns please reply to this email or contact Social Science Technology Services at 519-661-2152 or Ext. 82152</p>
</body></html>