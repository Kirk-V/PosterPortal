<?php

namespace App\Mail;

use App\Models\Posters;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ApprovalForSpeedCode extends Mailable
{
    use Queueable, SerializesModels;

    public Posters $poster;

    /**
     * Create a new message instance.
     */
    public function __construct(public String $poster_id)
    {
       //retrieve the poster data
       try{
        $this->poster = Posters::findOrFail($poster_id);
        }
        catch(ModelNotFoundException $e)
        {
            Log::info("Could not find poster model $e");
            Mail::to(["kvande85@uwo.ca", "rmcornwa@uwo.ca"])->send(new SSTSErrorNotification("Error Sending Approval request email, could not find poster $poster_id in database $e"));
        }
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Approval For Speed Code',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.ApprovalRequestMail',
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
