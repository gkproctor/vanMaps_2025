import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — VanMaps',
  description: 'Send suggestions, report issues, or request new locations for VanMaps.',
};

export default function ContactPage() {
  return (
    <main className="px-3 py-6 max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold mb-3">Contact</h1>
      <p className="text-slate-700 mb-6">
        Send me a message if you have suggestions or find a problem. If you want a location added
        that is between Prado and the Ports, please fill out this form— I&apos;ll check it out and get back to you.
      </p>

      <ContactForm />
    </main>
  );
}
