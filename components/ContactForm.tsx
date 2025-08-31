// components/ContactForm.tsx
'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

type State = {
  name: string;
  email: string;
  message: string;
  clownsOnly?: string; // honeypot
};

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k] ?? '')}`)
    .join('&');
}

export default function ContactForm() {
  const [state, setState] = useState<State>({ name: '', email: '', message: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: state.name || '',
        email: state.email || '',
        message: state.message || '',
        clownsOnly: state.clownsOnly || '',
      }),
    });

    window.location.href = '/thanks';
  };

  return (
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="clownsOnly"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot (hidden in CSS or visually) */}
      <p style={{ display: 'none' }}>
        <label>
          Don’t fill this out:{' '}
          <input name="clownsOnly" onChange={onChange} />
        </label>
      </p>

      <p>
        <label>
          Your name<br />
          <input name="name" required onChange={onChange} />
        </label>
      </p>

      <p>
        <label>
          Your email<br />
          <input type="email" name="email" required onChange={onChange} />
        </label>
      </p>

      <p>
        <label>
          Message<br />
          <textarea name="message" required onChange={onChange} />
        </label>
      </p>

      <button type="submit">Send</button>
    </form>
  );
}
