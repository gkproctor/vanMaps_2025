'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — VanMaps',
  description: 'Send suggestions, report issues, or request new locations for VanMaps.',
};

const FORM_NAME = 'contact';

function encode(data: Record<string, any>) {
  return Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
}

export default function ContactPage() {
  const [state, setState] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...state }),
      });
      window.location.assign(form.getAttribute('action') || '/thanks');
    } catch (err) {
      alert('There was a problem sending your message. Please try again.');
    }
  };

  return (
    <main className="px-3 py-6 max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold mb-3">Contact</h1>
      <p className="text-slate-700 mb-6">
        Send me a message if you have suggestions or find a problem. If you want a location added that is between Prado and the Ports, please fill out this form— I&apos;ll check it out and get back to you.
      </p>
      <form
        name={FORM_NAME}
        method="post"
        action="/thanks"
        data-netlify="true"
        data-netlify-honeypot="clownsOnly"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <p hidden>
          <label htmlFor="clownsOnly">You&apos;re a sucker!!: <input name="clownsOnly" onChange={handleChange} /></label>
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
    </main>
  );
}
