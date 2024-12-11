<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['name', 'slug', 'pages', 'styles', 'assets', 'symbols'];

    protected $casts = [
        'pages' => 'json',
        'styles' => 'json',
        'assets' => 'json',
        'symbols' => 'json',
    ];
}
