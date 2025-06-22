<?php

use App\Http\Controllers\AssetController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\PageController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\ProfileController;

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
Route::post('/page/{userId}', [PageController::class, 'createPage']);
Route::put('/page/{id}', [PageController::class, 'updatePage']);
Route::delete('/page/{id}', [PageController::class, 'deletePage']);
Route::get('/page/user/{userId}', [PageController::class, 'getPagesByUserId']);
Route::get('/page/user/{userId}/all', [PageController::class, 'getAllPagesByUserId']);
Route::get('/page/slug/{slug}', [PageController::class, 'getPageBySlug']);


// Page Content
Route::get('/page/{id}/content', [PageController::class, 'loadContent']);
Route::post('/page/{id}/content', [PageController::class, 'saveContent']);
Route::get('/page/{userId}/{slug}', [PageController::class, 'getPageByUserIdAndSlug']);
// Assets
Route::get('/assets', [AssetController::class, 'getAll']);
Route::post('/assets', [AssetController::class, 'upload']);
Route::post('/assets/youtube', [AssetController::class, 'storeYouTube']);

//Profile
Route::get('/profile/{userId}', [ProfileController::class, 'show']);
Route::get('/page/{username}/{slug}', [PageController::class, 'getPageByUsernameAndSlug']);


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
