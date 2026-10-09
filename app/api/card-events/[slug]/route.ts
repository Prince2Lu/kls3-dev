import { NextResponse } from 'next/server'

const SALES_OS_URL =
  process.env.NEXT_PUBLIC_KLS3_SALES_OS_URL || 'https://kls3-sales-os.kls3-dev.com'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const body = await request.text()
    const response = await fetch(
      `${SALES_OS_URL}/api/public-cards/${encodeURIComponent(slug)}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        cache: 'no-store',
      }
    )

    return new NextResponse(null, { status: response.ok ? 204 : response.status })
  } catch {
    return new NextResponse(null, { status: 502 })
  }
}
