<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;

class TemplateController extends Controller
{
    // List all templates
    public function index()
    {
        return Template::all();
    }

    // Show a single template
    public function show($id)
    {
        $template = Template::findOrFail($id);
        return response()->json($template);
    }

    // Save template to database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'html' => 'required|string',
            'css' => 'required|string',
            'components' => 'required|json',
        ]);

        $template = Template::create($validated);

        return response()->json(
            [
                'message' => 'Template saved successfully!',
                'template' => $template
            ],
            201
        );
    }

    // Update an existing template
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'html' => 'sometimes|required|string|max:255',
            'css' => 'sometimes|required|string|max:255',
            'components' => 'sometimes|required|json',
        ]);

        $template = Template::findOrFail($id);
        $template->update($validated);

        return response()->json($template);
    }

    // Delete a template
    public function destroy($id)
    {
        $template = Template::findOrFail($id);
        $template->delete();

        return response()->noContent();
    }
}
