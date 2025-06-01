<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 

class ProfileController extends Controller
{
    public function show($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }
}
