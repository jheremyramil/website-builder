<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApiLoginRequest;
use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiResponses;

    public function index() {}

    /**
     * Login user and issue a token.
     */
    public function login(ApiLoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
    
            if (!$user) {
                return $this->error(null, 'User not found', 404);
            }
    
            if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                return $this->error(null, 'Incorrect password', 401);
            }
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return $this->success([
                'user_id' => $user->id,
                'user' => $user,
                'token' => $token
            ], 'User logged in successfully');
            
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }
    
    

    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        try {
            $validatedUser = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:6',
            ], [
                'email.unique' => 'This email is already registered.',
            ]);
    
            // Add this check:
            if ($validatedUser->fails()) {
                return $this->error($validatedUser->errors(), 'Validation failed', 400);
            }
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return $this->success([
                'user' => $user,
                'token' => $token
            ], 'Registration Success', 200, false);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), 500);
        }
    }
    


    /**
     * Logout user and revoke tokens.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success([], 'Logout successful.', 200);
    }

    /**
     * Get the authenticated user's details.
     */
    public function me(Request $request)
    {
        // Retrieve the authenticated user
        $user = $request->user();

        // Return the authenticated user's details
        return $this->success([
            'user' => $user,
        ], 'User details fetched successfully.', 200, false);
    }
}
