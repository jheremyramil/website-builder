<?php

namespace App\Providers;

use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Apply Sanctum's middleware to API routes
        Route::middleware([
            EnsureFrontendRequestsAreStateful::class,
            SubstituteBindings::class,
            ThrottleRequests::class
        ])
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    }
}
