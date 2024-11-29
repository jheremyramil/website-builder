<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Template>
 */
class TemplateFactory extends Factory
{
    protected $model = \App\Models\Template::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'html' => '<div>' . fake()->word . '</div>',
            'css' => '.class { color: ' . fake()->safeColorName() . '; }',
            'components' => [
                [
                    'type' => 'text',
                    'content' => fake()->sentence,
                ],
                [
                    'type' => 'image',
                    'src' => fake()->imageUrl,
                ],
            ],
        ];
    }
}
