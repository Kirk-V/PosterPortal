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

class SSTSSpeedCodeApprovedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public Posters $poster;

    /**
     * Create a new message instance.
     */
    public function __construct(public int $poster_id)
    {
        //
        //retrieve the poster data
        try{
            $this->poster = Posters::findOrFail($poster_id);
        }
        catch(ModelNotFoundException $e)
        {
            Log::info("Attempted to send notification to SSTS that a speedcode has been approved but could not find poster model $e");
            Mail::to(["ssts-posters@uwo.ca"])->send(new SSTSErrorNotification("Error Sending speed code approval notification, could not find poster $poster_id in database $e"));
        }
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Speed Code Request Notification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.SpeedCodeApprovedMail',
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
