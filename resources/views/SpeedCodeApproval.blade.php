<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  </head>
  <body>
  </body>
</html>


<div class="container">
    <div class="row mt-3 row justify-content-center">
        <div class="col-12">
            <div class="row mt-3 justify-content-end">
                <div class="col-3">
                    <h6>Signed in as: {{$_SERVER['LOGON_USER']}}</h6>
                </div>
            </div>
            <div class="row mt-3 justify-content-center">
                <div class="col-6">
                    <h1>Poster Approval Form</h1>
                </div>
                
            </div>
            <div class="row mt-5 justify-content-center">
                <div class="col-6">
                    <h6>Poster Details</h6>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-3 border-bottom">
                    ID: 
                </div>
                <div class="col-3 border-bottom">
                    {{$poster->poster_id}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-3 border-bottom">
                    Requested By: 
                </div>
                <div class="col-3 border-bottom">
                    {{$request->first_name}} {{$request->last_name}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-3 border-bottom">
                    Cost Per Poster: 
                </div>
                <div class="col-3 border-bottom">
                    ${{2}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-3 border-bottom">
                    Quantity
                </div>
                <div class="col-3 border-bottom">
                    {{$poster->quantity}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-3 border-bottom">
                    Total
                </div>
                <div class="col-3 border-bottom">
                    ${{$poster->cost*$poster->quantity}}
                </div>
            </div>
            <div class="row mt-4 justify-content-center">
                <div class="col-6">
                    If you approve this printing service please fill out the form below and click approve. A notice will be sent to the requisitioner that the poster has been approved. 
                </div>
            </div>
            <div class="row mt-4 justify-content-center">
                <form class="mt-5 col-10" method="post" id="acceptForm" action="approveSpeedCode&id={{$poster->poster_id}}">
                    @csrf
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Speed Code" 
                                    name="speedcode" 
                                    aria-label="SpeedCode"
                                    required>
                                <span 
                                    class="input-group-text">-</span>
                                <input 
                                    type="text"
                                    class="form-control" 
                                    placeholder="Account" 
                                    name="account" 
                                    aria-label="Account">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    </div>
    <div class="row mt-3 row justify-content-center">
        <div class="col-6 justify-content-center">
        <div class="row mt-3">
            <div  class="col-3 mt-3">
                <button class="btn btn-success" form="acceptForm" type="submit">Approve</button>
            </div>
            <div class="col-3 mt-3 ms-auto">
                <form  class="col-3" action="rejectSpeedCode&id={{$poster->poster_id}}">
                    <button type="submit" class="btn btn-danger" onClick=confirmReject(e)>Reject</button>
                </form>
            </div>
        </div>
        </div>
    </div>
        
        
    
</div>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
<script>
function confirmReject(e){
    console.log('rejecting');
}
</script>