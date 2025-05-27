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
    $validated = $request->validate([
      'file' => 'nullable|file|max:5120|mimes:jpeg,png,jpg,gif,svg,pdf,docx,xlsx,txt', // Validation for single file
      'files.*' => 'nullable|file|max:5120|mimes:jpeg,png,jpg,gif,svg,pdf,docx,xlsx,txt', // Validation for multiple files
    ]);

    try {
      if (isset($validated['file'])) {
        $path = $validated['file']->store('uploads', 'public');
        Storage::setVisibility($path, 'public');
        $url = url("storage/{$path}");

        return $this->success([
          'url' => $url,
        ], "File uploaded successfully", 200);
      }

      if (isset($validated['files'])) {
        $uploadedFiles = [];
        foreach ($request->file('files') as $file) {
          $path = $file->store('uploads', 'public');
          Storage::setVisibility($path, 'public');
          $uploadedFiles[] = url("storage/{$path}");
        }

        return $this->success([
          'urls' => $uploadedFiles,
        ], "Files uploaded successfully", 200);
      }
    } catch (\Exception $e) {
      return $this->error([
        'message' => 'File upload failed',
        'error' => $e->getMessage(),
      ], $e->getMessage(), 500);
    }
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
