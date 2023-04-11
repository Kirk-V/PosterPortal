<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Posters>
 */
class PostersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        error_log('Seeding Database');

        return [
            'poster_id' => fake()->randomNumber(5, false),
            'request_id' => fake()->randomNumber(5, false),
            'job_id' => fake()->randomNumber(5, false),
            'state' => fake()->randomElement(['pending', 'rejected', 'accepted', 'printed', 'paid', 'complete']),
            'width' => fake()->randomFloat(2),
            'height' => fake()->randomFloat(2),
            'transaction_id' => fake()->randomNumber(5, false),
            'discount_eligible' => fake()->randomNumber(5, false),
            'speed_code' => fake()->randomNumber(5, false),
            'speed_code_approved' => fake()->bothify('?????-#####'),
            'discount' => fake()->randomFloat(2)
        ];
    }
}
