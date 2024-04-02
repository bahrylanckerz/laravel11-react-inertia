<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'             => fake()->sentence(),
            'description'      => fake()->realText(),
            'due_date'         => fake()->dateTimeBetween('now', '+1 year'),
            'image_path'       => fake()->imageUrl(),
            'priority'         => fake()->randomElement(['low', 'medium', 'high']),
            'status'           => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'assigned_user_id' => 2,
            'created_by'       => 2,
            'updated_by'       => 2,
        ];
    }
}
