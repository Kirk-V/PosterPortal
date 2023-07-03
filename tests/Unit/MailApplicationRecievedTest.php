<?php

namespace Tests\Unit;

use App\Mail\ApplicationConfirmation;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class MailApplicationRecievedTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_mail_is_sent(): void
    {
        // 
        // Mail::send(new ApplicationConfirmation(1));
        Mail::to("kvande85@uwo.ca")->send(new ApplicationConfirmation(7));
        Mail::fake();
        Mail::send(new ApplicationConfirmation(1));
        // Assert that a mailable was sent...
        Mail::assertSent(ApplicationConfirmation::class);
 


    }
}
