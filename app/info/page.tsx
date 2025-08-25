import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Info — VanMaps',
  description: 'How VanMaps helps van drivers find train and crew locations, plus usage tips and safety reminders.',
};

export default function InfoPage() {
  return (
    <main className="px-3 py-6 max-w-screen-sm mx-auto prose prose-slate">
      <h1 className="text-2xl font-bold">Info</h1>
      <p><strong>Van Maps</strong> was created to help van drivers find the train/crew. Not all pick-up, drop-off or crew change locations are easy to find. Hopefully this will ease the frustration of all.</p>
      <p>These directions will only get you to the city street turn out. Once there you will need to find your way to the train using the access road. Your navigation app will not work on dirt roads, see the directions in the 3rd column to get you to the train. Your safety is your responsibility.</p>
      <p>Be careful when crossing tracks. Using this file with a navigation app will use your cell data, see below for instructions if cell data is an issue.</p>
      <p>Select the location that you would like to go to and allow it to open in the Google Maps navigation app.</p>
      <p>Van Maps uses your phone&apos;s navigation app, only the GPS coordinates come from this mobile web app. If cell data is an issue then click on the location link to open it. Do NOT click start. In Google Nav click &quot;steps&quot;, and you will see step by step directions that you can follow which will minimize cellular data usage.</p>
      <p>If you have any suggestions that could make this app better, or if you find a problem, please use the contact form to let me know. Your suggestions and/or comments could help other drivers.</p>
    </main>
  );
}
