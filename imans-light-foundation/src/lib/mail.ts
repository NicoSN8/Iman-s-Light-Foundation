import nodemailer from 'nodemailer';

/**
 * Sends through the foundation's own Gmail account (SMTP + an App Password)
 * instead of a separate email-sending service — no new account, no DNS
 * changes, Gmail's free sending limit (500/day) is far more than a local
 * nonprofit's contact-form volume will ever hit. See SETUP-TODO.md Phase 4
 * for how GMAIL_USER / GMAIL_APP_PASSWORD get set.
 */
function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

interface ContactSubmission {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  lang: 'en' | 'es';
}

/**
 * Best-effort notification email to the org inbox when someone submits
 * /contact. Never throws — the database row (written before this is called)
 * is the source of truth for the message, so a mail failure here should
 * never make the contact form appear broken to the visitor.
 */
export async function sendContactNotification(submission: ContactSubmission): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.warn('sendContactNotification: GMAIL_USER/GMAIL_APP_PASSWORD not configured, skipping email.');
    return;
  }

  const label = submission.lang === 'es' ? 'Nuevo mensaje de contacto' : 'New contact form message';

  try {
    await transport.sendMail({
      from: `"Iman's Light Foundation Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: submission.email,
      subject: `${label}: ${submission.subject}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone || '(not provided)'}`,
        `Subject: ${submission.subject}`,
        '',
        submission.message,
        '',
        '---',
        'This message is also saved in /admin.',
      ].join('\n'),
    });
  } catch (err) {
    console.error('sendContactNotification: failed to send email:', err);
  }
}

interface AdminReplyInput {
  to: string;
  toName: string;
  originalSubject: string;
  originalMessage: string;
  replyText: string;
  lang: 'en' | 'es';
}

/**
 * Sends an admin's reply to whoever submitted a /contact message. Unlike
 * sendContactNotification, this one is NOT best-effort — the admin needs to
 * know whether their reply actually went out, so callers should surface a
 * thrown error rather than swallow it.
 */
export async function sendAdminReply(input: AdminReplyInput): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    throw new Error('Email is not configured yet (GMAIL_USER/GMAIL_APP_PASSWORD missing).');
  }

  const quoted = input.originalMessage
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n');

  const subjectPrefix = input.lang === 'es' ? 'Re' : 'Re';

  await transport.sendMail({
    from: `"Iman's Light Foundation" <${process.env.GMAIL_USER}>`,
    to: input.to,
    subject: `${subjectPrefix}: ${input.originalSubject}`,
    text: [
      input.replyText,
      '',
      '---',
      input.lang === 'es'
        ? `${input.toName} escribió originalmente:`
        : `${input.toName} originally wrote:`,
      quoted,
    ].join('\n'),
  });
}
