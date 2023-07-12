<?php

namespace Database\Factories;

use App\Models\Posters;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jobs>
 */
class JobsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $state = fake()->randomElement(['in_queue', 'printed', 'on_hold']);
        $print_date = $state == 'printed' ? fake()->dateTime() :null;
        return [
            //id auto gen'd
            'poster_id' => Posters::factory(),
            'job_state' => $state,
            'print_date' => $print_date,
            'emailed_receipt_req' => $state == 'printed'? fake()->randomElement([1, 0,]) : 0,
            'emailed_receipt_grant_holder' => $state == 'printed'? fake()->randomElement([1, 0,]) : 0,
            'emailed_receipt_ssts' => $state == 'printed'? fake()->randomElement([1, 0,]) : 0,
            'technician' => fake()->randomElement(['Rick', 'Steve', 'Kirk'])
        ];
    }
}
