<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRegisterRequest;
use App\Http\Requests\ApiLoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ApiUserController extends Controller
{
    //
    public function register(ApiRegisterRequest $request) {
        $user = new User;
        $user->fill($request->all());
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json($user);
    }

    //
    public function login(ApiLoginRequest $request) {
        // Check User
        if(Auth::attempt([
            'email' => $request->email,
            'password' => $request->password]
        )) {
            $user = User::whereEmail($request->email)->first();
            $user->token = $user->createToken('App')->accessToken;

            return response()->json($user);
        }

        return response()->json(['error' => 'Sai email hoặc password'], 401);
    }

    //
    public function userInfo(Request $request) {
        return response()->json($request->user('api'));
    }
}
