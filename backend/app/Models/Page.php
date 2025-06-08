<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['name', 'slug', 'pages', 'styles', 'assets', 'symbols', 'user_id'];

    protected $casts = [
        'pages' => 'json',
        'styles' => 'json',
        'assets' => 'json',
        'symbols' => 'json',
    ];

    // Each Page belongs to one User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
