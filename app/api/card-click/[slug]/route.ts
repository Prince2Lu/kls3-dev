import { NextResponse } from 'next/server'

const SALES_OS_URL =
  process.env.NEXT_PUBLIC_KLS3_SALES_OS_URL || 'https://kls3-sales-os.kls3-dev.com'

const ALLOWED_TYPES = new Set([
  'linkedin_click',
  'website_click',
  'project_click',
])

function safeHttpTarget(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : ''
  } catch {
    return ''
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const url = new URL(request.url)

  const eventType = url.searchParams.get('type') || ''
  const target = safeHttpTarget(url.searchParams.get('target') || '')
  const source = url.searchParams.get('source') || 'direct'
  const campaign = url.searchParams.get('campaign') || ''
  const visitorId = url.searchParams.get('visitor') || ''
  const projectLabel = url.searchParams.get('project_label') || ''
  const cardRef = url.searchParams.get('ref') || ''

  if (!ALLOWED_TYPES.has(eventType) || !target) {
    return NextResponse.redirect(new URL(`/carte/${encodeURIComponent(slug)}`, request.url))
  }

  try {
    await fetch(
      `${SALES_OS_URL}/api/public-cards/${encodeURIComponent(slug)}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          visitorId,
          source,
          campaign,
          projectLabel,
          cardRef,
          pageReferrer: request.headers.get('referer') || '',
        }),
        cache: 'no-store',
      }
    )
  } catch {
    // Never block the visitor if analytics fails.
  }

  return NextResponse.redirect(target, 302)
}
