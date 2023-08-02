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
        $state = fake()->randomElement(['in_queue', 'printed', 'pending_pickup',  'on_hold', 'cancelled', 'picked_up']);
        
        return [
            //id auto gen'd
            'poster_id' => Posters::factory(),
            'job_state' => function (array $attributes)
            {
                if(Posters::find($attributes['poster_id'])->state == 'accepted')
                {
                    return fake()->randomElement(['in_queue', 'printed', 'pending_pickup']);
                }
                else
                {
                    return fake()->randomElement(['cancelled', 'picked_up']);
                }
            },
            'print_date' => function(array $attributes)
            {
                $state = $attributes['job_state'];
                return ($state == 'printed' || $state == 'pending_pickup') ? fake()->dateTime() :null;
            },
            'emailed_receipt_req' => $state == 'printed'? fake()->randomElement([1, 0,]) : 0,
            'emailed_receipt_grant_holder' => $state == 'printed'? fake()->randomElement([1, 0,]) : 0,
            'emailed_receipt_ssts' => $state == 'printed'? fake()->randomElement([1, 0,]) : 0,
            'technician' => fake()->randomElement(['Rick', 'Steve', 'Kirk'])
        ];
    }
}
