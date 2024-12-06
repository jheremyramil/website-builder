<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;
use App\Traits\ApiResponses;
use Throwable;

class TemplateController extends Controller
{
    use ApiResponses;

    // List all templates
    public function templates()
    {
        return Template::all();
    }

    // Show a single template
    public function getTemplateById($id)
    {
        try {
            $template = Template::findOrFail($id);
            return $this->success([
                'html' => $template->html,
                'css' => $template->css,
                'components' => $template->components,
                'styles' => $template->styles,
            ], 'Success getting template', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    // Save template to database
    public function createTemplate(Request $request)
    {
        try {
            $validated = $request->validate([
                'html' => 'required|string',
                'css' => 'required|string',
                'components' => 'required|json',
                'styles' => 'required|json',
            ]);

            $template = Template::create($validated);

            return $this->success([
                'template' => $template
            ], 'Template saved successfully!', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    // Update an existing template
    public function updateTemplate(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'html' => 'sometimes|required|string',
                'css' => 'sometimes|required|string',
                'components' => 'sometimes|required|json',
                'style' => 'sometimes|required|json',
            ]);

            $template = Template::findOrFail($id);
            $template->update($validated);

            return $this->success([
                'template' => $template
            ], 'Template updated Successfully!', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }

    // Delete a template
    public function deleteTemplate($id)
    {
        try {
            $template = Template::findOrFail($id);
            $template->delete();

            return response()->noContent();
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }
}
