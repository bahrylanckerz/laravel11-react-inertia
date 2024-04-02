<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
            'image'            => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'name'             => ['required', 'max:255'],
            'description'      => ['required', 'string'],
            'due_date'         => ['nullable', 'date'],
            'priority'         => ['required', Rule::in('low', 'medium', 'high')],
            'project_id'       => ['required', 'exists:projects,id'],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'status'           => ['required', Rule::in('pending', 'in_progress', 'completed')],
        ];
    }
}
