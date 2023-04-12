<?php

namespace Database\Factories;

use App\Models\Posters;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TransactionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //id auto gen'd
            'poster_id' => Posters::factory(),
            'transaction_date' => fake()->date(),
            'total_recieved' => fake()->randomFloat(),
            'reconciled' => fake()->boolean(),
        ];
    }
}
