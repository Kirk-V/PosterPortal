<?php

namespace Database\Factories;

use App\Models\Posters;
use App\Models\Transactions;
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
        fake()->seed(random_int(1,1000));
        return [
            // 'poster_id' => fake()->randomNumber(5, false),
            // 'request_id' => fake()->randomNumber(5, false),
            // 'job_id' => fake()->randomNumber(5, false),
            'state' => fake()->randomElement(['pending', 'ready', 'rejected', 'accepted', 'complete', 'paid']),
            'width' => fake()->randomFloat(2),
            'height' => fake()->randomFloat(2),
            'quantity' => fake()->randomDigitNotZero(),
            'units' => fake()->randomElement(['cm', 'inches']),
            // 'transaction_id' => fake()->randomNumber(5, false),
            'discount_eligible' => fake()->randomElement([0,1]),
            'speed_code' => fake()->optional($weight = 0.4)->bothify('?????-#####'),
            'speed_code_approved' => fake()->boolean(),
            'discount' => fake()->randomFloat(2, 10, 200),
            'cost' => fake()->randomFloat(2, 10, 600),
            'file_location' => fake()->word()."/".fake()->fileExtension(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Posters $poster)
        {
            if($poster->state == "complete")
            {
                $poster->transactions = Transactions::factory()->recycle($poster)->count(1)->create();
            }
        });
    }

    
}
