<?php

namespace App\Mail;

use App\Models\Posters;
use App\Modes\Requests;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PosterRejectionNoticeApprover extends Mailable
{
    use Queueable, SerializesModels;

    public Posters $poster;
    public \App\Models\Requests $request;

    /**
     * Create a new message instance.
     */
    public function __construct(public string $poster_id)
    {
        //
        try{
            $this->poster = Posters::findOrFail($poster_id);
            $this->request = $this->poster->requests;

        }
        catch(ModelNotFoundException $e)
        {
            Log::info("Could not find poster model and/or request model $e");
            Mail::to("kvande85@uwo.ca")->send(new SSTSErrorNotification("Error Sending Poster Accepted for printing notice. Could not find poster $poster_id in database $e"));
        }
        catch(Exception $e)
        {
            Log::info("Could not find poster model and/or request model $e");
        }

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Poster Rejection Notice Approver',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.PosterRejectedApprover'
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
