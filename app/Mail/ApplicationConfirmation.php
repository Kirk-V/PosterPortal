<?php

namespace App\Mail;

use App\Models\Posters;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mime\Address;

class ApplicationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public Posters $poster;

    /**
     * Create a new message instance.
     */
    public function __construct(public String $poster_id, )
    {
        //retrieve the poster data
        try{
            $this->poster = Posters::findFirst($poster_id);
        }
        catch(ModelNotFoundException $e)
        {
            Mail::to("kvande85@uwo.ca")->send(new SSTSErrorNotification("Error Sending Application Confirmation, could not find poster $poster_id in database $e"));
        }
        
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [
                new Address('ssts-poster@uwo.ca')
            ],
            subject: 'SSTS - Poster Printing Application Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.ApplicationConfirmationMail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
