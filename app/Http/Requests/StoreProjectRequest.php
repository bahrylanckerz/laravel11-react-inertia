<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'image'       => 'nullable|image|mimes:png,jpg,jpeg',
            'name'        => 'required|max:255',
            'description' => 'required|string',
            'due_date'    => 'nullable|date',
            'status'      => ['required', Rule::in('pending', 'in_progress', 'completed')],
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
            'image.image'          => 'The project image must be type image',
            'image.mimes'          => 'The project image must extension .png, .jpg, .jpeg',
            'name.required'        => 'The project name is required',
            'name.max'             => 'The project name maximal 255 character',
            'description.required' => 'The project description is required',
            'description.string'   => 'The project description must string only',
            'due_date.date'        => 'The project deadline must be date type',
            'status.required'      => 'The project status is required',
        ];
    }
}
