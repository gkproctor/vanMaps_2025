// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type SanityWebhookBody = {
  _type?: string;           // document type (from projection)
  slug?: string | null;     // slug.current (from projection)
  operation?: string;       // optional, if you include it in projection
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-sanity-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: SanityWebhookBody | null = null;
  try {
    body = await req.json();
  } catch {
    // ignore, we’ll still revalidate list as a fallback
  }

  // Always revalidate list pages that show locations
  revalidatePath('/');         // if your home shows anything from Sanity
  revalidatePath('/browse');   // initial list

  // Revalidate detail page if we got the slug and the type
  if (body?._type === 'location' && body.slug) {
    revalidatePath(`/locations/${body.slug}`);
  }

  return NextResponse.json({ ok: true, revalidated: true, slug: body?.slug ?? null });
}
