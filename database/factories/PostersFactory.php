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
            //
            'poster_id' => $this->faker->randomNumber(5, false),
            'request_id' => $this->faker->randomNumber(5, false),
            'job_id' => $this->faker->randomNumber(5, false),
            'state' => $this->faker->randomElements(['pending', 'rejected', 'accepted', 'printed', 'paid', 'complete']),
            'width' => $this->faker->randomFloat(2),
            'height' => $this->faker->randomFloat(2),
            'transaction_id' => $this->faker->randomNumber(5, false),
            'discount_eligible' => $this->faker->randomNumber(5, false),
            'speed_code' => $this->faker->randomNumber(5, false),
            'speed_code_approved' => $this->faker->bothify('?????-#####'),
            'discount' => $this->faker->randomFloat(2),
        ];
    }
}
