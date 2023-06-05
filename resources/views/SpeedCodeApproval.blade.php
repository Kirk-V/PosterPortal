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
    <div class="row">
        <div class="col-6">
            <h1>Poster Approval Form</h1>

        </div>
        <div class="col-6">
            <h6>Signed in as: {{$_SERVER['LOGON_USER']}}</h6>
        </div>
    </div>
    <form action="/foo/bar" method="POST">
        @method('PUT')
        <label for="email">Email address</label>
        <input id="email"
        type="email"
        class="@error('email') is-invalid @else is-valid @enderror">
    </form>
</div>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
