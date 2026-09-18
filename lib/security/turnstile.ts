const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TEST_SECRET_KEY = '1x0000000000000000000000000000000AA'
const ALLOWED_PRODUCTION_HOSTNAMES = new Set(['kls3-dev.com', 'www.kls3-dev.com'])

type TurnstileAction = 'contact' | 'diagnostic'

type TurnstileResponse = {
  success: boolean
  hostname?: string
  action?: string
  'error-codes'?: string[]
}

export async function verifyTurnstileToken(
  token: unknown,
  expectedAction: TurnstileAction
): Promise<boolean> {
  if (typeof token !== 'string' || !token || token.length > 2048) {
    return false
  }

  const isProduction = process.env.VERCEL_ENV === 'production'
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY || (isProduction ? undefined : TEST_SECRET_KEY)

  if (!secretKey) {
    console.error('[turnstile] clé secrète absente en production')
    return false
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('[turnstile] Siteverify indisponible', response.status)
      return false
    }

    const result = (await response.json()) as TurnstileResponse

    if (!result.success) {
      console.warn('[turnstile] jeton refusé', result['error-codes'])
      return false
    }

    if (
      isProduction &&
      (result.action !== expectedAction ||
        !result.hostname ||
        !ALLOWED_PRODUCTION_HOSTNAMES.has(result.hostname))
    ) {
      console.warn('[turnstile] contexte de jeton invalide', {
        action: result.action,
        hostname: result.hostname,
      })
      return false
    }

    return true
  } catch (error) {
    console.error('[turnstile] erreur de validation', error)
    return false
  }
}
