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
        return [
            // 'poster_id' => fake()->randomNumber(5, false),
            // 'request_id' => fake()->randomNumber(5, false),
            // 'job_id' => fake()->randomNumber(5, false),
            'state' => fake()->randomElement(['pending', 'rejected', 'accepted', 'printed', 'paid', 'complete']),
            'width' => fake()->randomFloat(2),
            'height' => fake()->randomFloat(2),
            // 'transaction_id' => fake()->randomNumber(5, false),
            'discount_eligible' => fake()->randomNumber(5, false),
            'speed_code' => fake()->optional($weight = 0.4)->bothify('?????-#####'),
            'speed_code_approved' => fake()->boolean(),
            'discount' => fake()->randomFloat(2),
            'cost' => fake()->randomFloat(2),
        ];
    }
}
