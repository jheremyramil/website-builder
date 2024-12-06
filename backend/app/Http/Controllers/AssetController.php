<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    use ApiResponses;

    public function getAll()
    {
        $assets = Asset::all();

        return $this->success([
            'assets' => $assets
        ], 'Successfully retrieved all assets', 200, false);
    }
}
