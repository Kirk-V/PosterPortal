<html lang="en">
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Speed Code Approval' }}</title>
  </head>
  <body class="bg-secondary-subtle w-100">
    <div class="container w-50 mt-3 bg-light rounded shadow-lg">
        <div class="row">
            <div class="col-12"><h1 style="color: #4F2683">Social Science Technology Services</h1></div>
            <hr class="border border-dark border-3 opacity-75">
        </div>
        <div class="row">
            {{$slot}}
        </div>
        
    </div>
</html>