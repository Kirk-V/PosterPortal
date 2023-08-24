<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PDFMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public String $poster_id, public String $MailType)
    {
        //

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {

        $subjectWording = "Requisitioner";
        if($this->MailType == 'GrantHolder')
        {
            $subjectWording = "Grant Approver";
        }
        else if($this->MailType == 'AdminAssistant')
        {
            $subjectWording = "";
        }
        return new Envelope(
            subject: "SSTS Poster Printing Service - $subjectWording Receipt",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.PDFReceipt',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromPath("../resources/views/mail/Receipts/Receipt_$this->poster_id.pdf"),
        ];
    }
}
