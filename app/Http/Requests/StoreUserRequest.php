<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'     => ['required', 'min:3'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', Password::min(6)->letters()->symbols(), 'confirmed'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required'      => 'The user full name is required',
            'name.min'           => 'The user full name minimum 3 character',
            'email.required'     => 'The email address is required',
            'email.email'        => 'The email address is not valid',
            'email.unique'       => 'The email address has been registered',
            'password.required'  => 'The password is required',
            'password.min'       => 'The password minimum 6 character',
            'password.letters'   => 'The password must be include alphabet character',
            'password.symbols'   => 'The password must be include symbol character',
            'password.confirmed' => 'The password not matches with confirm password',
        ];
    }
}
