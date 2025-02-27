<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Traits\ApiResponses;
use App\Traits\ExtractYoutubeId;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    use ApiResponses;
    use ExtractYoutubeId;

    public function getAll(Request $request)
    {
        $page = $request->query('page', 1); // Default to page 1 if not specified
        $pages = Page::paginate(5, ['*'], 'page', $page);
        return response()->json($pages, 200);
    }

    public function getPageById($id)
    {
        try {
            $page = Page::findOrFail($id);

            return $this->success([
                'name' => $page->name,
                'slug' => $page->slug,
            ], 'Success getting page', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    public function createPage(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'slug' => 'nullable|string',
            ]);

            $validated['slug'] = $validated['name'] ?? Str::of($validated['name'])->slug()->lower();

            $page = Page::create($validated);

            return $this->success([
                'page' => $page
            ], 'Page created successfully!', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    public function saveContent(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'pages' => 'required|array',
                'styles' => 'nullable|array',
                'assets' => 'nullable|array',
                'symbols' => 'nullable|array',
            ]);

             // Ensure images in `pages` only store URLs, not base64
            foreach ($validatedData['pages'] as &$component) {
                if (isset($component['type']) && $component['type'] === 'image') {
                    // Make sure 'src' is not base64
                    if (strpos($component['attributes']['src'], 'data:image') === 0) {
                        return $this->error([
                            'message' => 'Base64 images are not allowed. Please upload an image.',
                        ], 400);
                    }
                }

                if (isset($component['type']) && $component['type'] === 'video') {
                    $videoUrl = $component['attributes']['src'] ?? null;
                    if ($videoUrl) {
                        $videoId = $this->extractYouTubeId($videoUrl);
                        if ($videoId) {
                            $component['attributes']['src'] = $videoId; // Store only the ID
                        }
                    }
                }
            }

            // Find the page by ID
            $page = Page::findOrFail($id);

            if (!$page) {
                return $this->error(['message' => 'Page not found'], 404);
            }

            $page->pages = $validatedData['pages'];
            $page->styles = $validatedData['styles'] ?? [];
            $page->assets = $validatedData['assets'] ?? [];
            $page->symbols = $validatedData['symbols'] ?? [];
            $page->save();

            return $this->success([
                'content' => $page
            ], 'Content updated successfully', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    public function loadContent($id)
    {
        try {
            // Find the page by ID
            $page = Page::findOrFail($id);

            return $this->success([
                'pages' => $page->pages,
                'styles' => $page->styles,
                'assets' => $page->assets,
                'symbols' => $page->symbols
            ], 'Success loading content', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    public function updatePage(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'slug' => 'required|string',
            ]);

            $page = Page::findOrFail($id);
            $page->update($validated);

            return $this->success([
                'page' => $page
            ], 'Page updated Successfully!', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    public function deletePage($id)
    {
        try {
            $page = Page::findOrFail($id);
            $page->delete();

            return response()->noContent();
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }
}
