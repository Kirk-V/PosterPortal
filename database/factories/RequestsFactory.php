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
            'payment_method' => fake()->randomElement(['cash', 'speed_code']),
            'applied_for_discount' => fake()->boolean(),
            'user_logged_in' => fake()->userName(),
            // 'position' => fake()->randomElement(['graduate', 'faculty', 'undergraduate', 'staff']),
            // 'quantity' => fake()->randomDigitNotZero(),
        ];

        if($returnArray["payment_method"] == 'speed_code')
        {
            $returnArray['approver_type'] = fake()->randomElement(['dosa', 'administrator', 'grant holder']);
            $returnArray['grant_holder_name'] = fake()->name();
            $returnArray['approver_email'] = fake()->email();
            if($returnArray['approver_type'] == 'dosa')
            {
                $returnArray['approver_name'] = fake()->name();
                
            }
            else
            {
                $returnArray['approver_name'] = $returnArray['grant_holder_name'];
            }
            $returnArray['approver_email'] = 'kvande85@uwo.ca';
            $returnArray['grant_holder_name'] = "Kirk";
        }
        else
        {
            $returnArray['grant_holder_name'] = null;
            $returnArray['approver_email'] = null;
            $returnArray['approver_type'] = null;
        }

        return $returnArray;
    }
}
