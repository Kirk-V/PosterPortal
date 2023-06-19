<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Courses>
 */
class CoursesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $year = fake()->numberBetween(2020,2024);

        return [
            //id auto gen'd
            'number' => fake()->bothify('####'),
            'year' => "$year/".($year+1),
            'department'=> fake()->randomElement(config('app.departments')),
            'instructor' => fake()->name(),
        ];
    }
}
