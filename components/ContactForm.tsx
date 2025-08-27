//'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

const FORM_NAME = 'contact';

// unchanged
function encode(data: Record<string, any>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default function ContactForm() {
  const [state, setState] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      // ✅ Post to the static detection file so Netlify will process it
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...state }),
      });
      window.location.assign(form.getAttribute('action') || '/thanks');
    } catch {
      alert('There was a problem sending your message. Please try again.');
    }
  };

  return (
    <form
      name={FORM_NAME}
      method="post"
      action="/thanks"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* keep names matching the static detection form */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p hidden>
        <label htmlFor="clownsOnly">
          You&apos;re a sucker!!: <input name="clownsOnly" onChange={handleChange} />
        </label>
      </p>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Your name</label>
        <input id="name" name="name" required onChange={handleChange} className="mt-1 w-full rounded-2xl border px-4 py-3 outline-none focus:border-primary" type="text" autoComplete="name" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Your email</label>
        <input id="email" name="email" required onChange={handleChange} className="mt-1 w-full rounded-2xl border px-4 py-3 outline-none focus:border-primary" type="email" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
        <textarea id="message" name="message" required onChange={handleChange} className="mt-1 w-full rounded-2xl border px-4 py-3 outline-none focus:border-primary min-h-[140px]" />
      </div>

      <button type="submit" className="btn">Send</button>
    </form>
  );
}
