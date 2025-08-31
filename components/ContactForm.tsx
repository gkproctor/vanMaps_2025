'use client';

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k] ?? '')}`)
    .join('&');
}

export default function ContactForm() {
  const [state, setState] = React.useState<Record<string, string>>({});

  return (
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="clownsOnly"
      onSubmit={async (e) => {
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
      }}
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* honeypot (hidden by CSS if you don’t want hidden attribute) */}
      <p style={{ display: 'none' }}>
        <label>
          Don’t fill this out:{' '}
          <input
            name="clownsOnly"
            onChange={(e) => setState({ ...state, clownsOnly: e.target.value })}
          />
        </label>
      </p>

      <p>
        <label>
          Your name<br />
          <input
            name="name"
            required
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </label>
      </p>

      <p>
        <label>
          Your email<br />
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </label>
      </p>

      <p>
        <label>
          Message<br />
          <textarea
            name="message"
            required
            onChange={(e) => setState({ ...state, message: e.target.value })}
          />
        </label>
      </p>

      <button type="submit">Send</button>
    </form>
  );
}
