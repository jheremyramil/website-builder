<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        Storage::setVisibility($path, 'public'); // Ensure it's publicly accessible

        // Generate public URL
        $url = asset("storage/{$path}");

        return response()->json([
            'url' => $url,
        ]);
    }

}
