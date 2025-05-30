<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = ['html', 'css', 'components', 'style'];

    protected $casts = [
        'components' => 'array',
    ];
}
