<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Traits\ApiResponses;
use App\Traits\ExtractYoutubeId;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AssetController extends Controller
{
    use ApiResponses;
    use ExtractYoutubeId;

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
            'file' => 'required|file|max:5120', // Max 5MB
            'file' => 'mimes:jpeg,png,jpg,gif,svg,pdf,docx,xlsx,txt', // Allowed file types
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        Storage::setVisibility($path, 'public'); // Ensure it's publicly accessible

        // Generate public URL
        $url = asset("storage/{$path}");

        return $this->success([
            'url' => $url,
        ], 200, false);
    }

    /**
     * Store YouTube embed (only saves the video ID).
     */
    public function storeYouTube(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $videoId = $this->extractYouTubeId($request->url);

        if (!$videoId) {
            return $this->error([
                'message' => 'Invalid YouTube URL',
            ], 400);
        }

        $asset = Asset::create([
            'type' => 'youtube',
            'url' => $videoId, // Store only the ID
        ]);

        return $this->success([
            'message' => 'YouTube video saved successfully',
            'data' => $asset,
        ], 200, false);
    }
}
