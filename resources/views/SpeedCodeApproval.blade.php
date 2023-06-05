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
    <div class="row mt-3">
        <div class="col-6">
            <h1>Poster Approval Form</h1>
        </div>
        <div class="col-6">
            <h6>Signed in as: {{$_SERVER['LOGON_USER']}}</h6>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-12">
            <h6>Poster Details</h6>
        </div>
    </div>
    <div class="row ">
        <div class="col-3 border-bottom">
            ID: 
        </div>
        <div class="col-3 border-bottom">
            {{$poster_id}}
        </div>
    </div>
    <div class="row">
        <div class="col-3 border-bottom">
            Requested By: 
        </div>
        <div class="col-3 border-bottom">
            username
        </div>
    </div>
    <div class="row">
        <div class="col-3 border-bottom">
            Cost Per Poster: 
        </div>
        <div class="col-3 border-bottom">
            ${{$cost}}
        </div>
    </div>
    <div class="row">
        <div class="col-3 border-bottom">
            Quantity
        </div>
        <div class="col-3 border-bottom">
            ${{$cost}}
        </div>
    </div>
    <div class="row">
        <div class="col-3 border-bottom">
            Total
        </div>
        <div class="col-3 border-bottom">
            ${{$cost}}
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-12">
            If you approve this printing service please fill out the form below and click approve. A notice will be sent to the requisitioner that the poster has been approved. 
        </div>
    </div>
    <form class="mt-5" method="post" action="approveSpeedCode&id={{$poster_id}}">
        @csrf
        <div class="row">
            <div class="col-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Speed Code" name="speedcode" aria-label="SpeedCode">
                    <span class="input-group-text">-</span>
                    <input type="text" class="form-control" placeholder="Account" name="account" aria-label="Account">
                  </div>
            </div>
        </div>
        <button type="submit">Approve</button>
    </form>
</div>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
