// app/browse/page.tsx
import { redirect } from 'next/navigation';

export default function BrowseRedirect() {
  redirect('/locations');
}
