<?php

use App\Http\Controllers\AssetController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TemplateController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {


    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Pages
Route::get('/page', [PageController::class, 'getAll']);
Route::get('/page/{id}', [PageController::class, 'getPageById']);
Route::get('/page/{id}/content', [PageController::class, 'loadContent']);
Route::post('/page', [PageController::class, 'createPage']);
Route::post('/page/{id}/content', [PageController::class, 'saveContent']);
Route::put('/page/{id}', [PageController::class, 'updatePage']);
Route::delete('/page/{id}', [PageController::class, 'deletePage']);

// Assets
Route::get('/assets', [AssetController::class, 'getAll']);



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
