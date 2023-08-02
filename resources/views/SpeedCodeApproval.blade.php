<x-layouts.approval-layout>


<div class="container">
    <div class="row mt-3 row justify-content-center">
        <div class="col-12">
            <div class="row mt-3 justify-content-end">
                <div class="col-4">
                    <h6>Signed in as: {{$_SERVER['LOGON_USER']}}</h6>
                </div>
            </div>
            <div class="row mt-3 justify-content-center">
                <div class="col-8">
                    <h1>Poster Approval Form</h1>
                </div>
                
            </div>
            <div class="row mt-5 justify-content-center">
                <div class="col-8">
                    <h6>Poster Details</h6>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 border-bottom">
                    ID: 
                </div>
                <div class="col-4 border-bottom">
                    {{$poster->poster_id}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 border-bottom">
                    Requisitioner:
                </div>
                <div class="col-4 border-bottom">
                    {{$request->first_name}} {{$request->last_name}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 border-bottom">
                    Cost Per Poster: 
                </div>
                <div class="col-4 border-bottom">
                    ${{$poster->cost}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 border-bottom">
                    Quantity
                </div>
                <div class="col-4 border-bottom">
                    {{$poster->quantity}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 border-bottom">
                    Total
                </div>
                <div class="col-4 border-bottom">
                    ${{number_format((float)$poster->cost * $poster->quantity, 2, '.', '')}}
                </div>
            </div>
            <div class="row mt-4 justify-content-center">
                <div class="col-8">
                    If you approve of this poster printing request, please enter a Speedcode, Account number and click Approve.
                    NOTE: Account number 621400 is the classification for Printing. You can change the Account number if required.
                    A notification will be sent to the requisitioner that this order has been approved and printing can proceed.
                </div>
            </div>
            <div class="row mt-4 justify-content-center">
                <form class="mt-4 col-10" method="post" id="acceptForm" action="approveSpeedCode&id={{$poster->poster_id}}">
                    @csrf
                    <div class="row justify-content-center">
                        <div class="col-8">
                            <div class="input-group mb-3">
                                <div class="form-floating">
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        name="speedcode"
                                        maxLength="4"
                                        pattern="[A-Za-z0-9]+"
                                        placeholder="Speed Code"
                                        aria-label="SpeedCode"
                                        required>
                                        <label for="speedcode">Speed Code</label>
                                </div>
                                <span class="input-group-text">-</span>
                                <div class="form-floating">
                                    <input 
                                        type="text"
                                        class="form-control" 
                                        value={{config('app.default_account')}}
                                        name="account"
                                        maxLength="6"
                                        pattern="[A-Za-z0-9]+"
                                        aria-label="Account">
                                        <label for="speedcode">Account</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    </div>
    <div class="row mt-3 mb-4 row justify-content-center">
        <div class="col-8">
            <div class="row mt-3">
                <div  class="col-4 mt-3">
                    <button class="btn btn-success" form="acceptForm" type="submit">Approve</button>
                </div>
                <div class="col-4 mt-3 ms-auto">
                    <form  class="float-end" method="post" action="rejectSpeedCode&id={{$poster->poster_id}}">
                        @csrf
                        <button type="submit" class="btn btn-danger" onClick=confirmReject()> Reject </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</x-layouts.approval-layout>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
<script>
function confirmReject(e){
    console.log('rejecting');
}
</script>