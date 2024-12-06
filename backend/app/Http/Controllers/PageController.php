<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    use ApiResponses;

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
                'content' => $page->content
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
                'content' => 'nullable|json',
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

    public function saveContent($id)
    {
        try {
            // Find the page by ID
            $page = Page::findOrFail($id);

            if (!$page) {
                return $this->error(['message' => 'Page not found'], 404);
            }

            $page->save();

            return $this->success([
                'page' => $page
            ], 'Page updated successfully', 200, false);
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
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content ?? ''
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
                'content' => 'required|json',
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
