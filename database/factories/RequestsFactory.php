<?php

namespace Database\Factories;

use App\Models\Courses;
use App\Models\Posters;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Requests>
 */
class RequestsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        //extra logic to keep speedcode and grant_holder together

        
        $returnArray = 
        [
            'poster_id' => Posters::factory(),
            'course_id' => Courses::factory(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'department' => fake()->randomElement(['Anthropology', 'Brain and Mind', 'Dan Management', 'Deans Office', 'Economics', 'Geography', 'History', 'Indigenous Studies', 'Nest', 'Political Science', 'Psychology', 'Sociology', 'SSTS', 'Other']),
            'payment_method' => fake()->randomElement(['cash', 'speedcode']),
            'position' => fake()->randomElement(['graduate', 'faculty', 'undergraduate', 'staff']),
            'quantity' => fake()->randomDigitNotZero(),
        ];

        if($returnArray["payment_method"] == 'speedcode')
        {
            $returnArray['grant_holder_name'] = fake()->name();
            $returnArray['grant_holder_email'] = fake()->email();
        }
        else
        {
            $returnArray['grant_holder_name'] = null;
            $returnArray['grant_holder_email'] = null;
        }

        return $returnArray;
    }
}
