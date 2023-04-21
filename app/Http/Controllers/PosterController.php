<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use Illuminate\Http\Request;

class PosterController extends Controller
{
    //Gets the cost of a poster with the given ID
    public function getCostPerPoster($id)
    {

    }

    public function getPosterCostDetails($id)
    {
        return response()->json(Posters::getPosterCostDetails($id));
    }
}
