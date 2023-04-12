<?php

namespace Database\Factories;

use App\Models\Courses;
use App\Models\Posters;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transactions>
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
            //
                //id auto gen'd
                'poster_id' => Posters::factory(),
                'course_id' => Courses::factory(),
                'transaction_date' => fake()->date(),
                'total_recieved' => fake()->randomFloat(),
                'reconciled' => fake()->boolean(),
        
        ];
    }
}
