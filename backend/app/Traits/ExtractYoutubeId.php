<?php

namespace App\Traits;

trait ExtractYoutubeId
{
    public function extractYouTubeId($url)
    {
        preg_match('/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*[?&]v=))([^"&?\/\s]{11})/', $url, $matches);
        return $matches[1] ?? null;
    }
}
