import { type NextRequest, NextResponse } from 'next/server'

function getOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')
  if (forwardedHost && forwardedProto) {
    return `${forwardedProto}://${forwardedHost}`
  }
  return request.nextUrl.origin
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lang = searchParams.get('lang')
  const redirect = searchParams.get('redirect') ?? '/'
  const origin = getOrigin(request)

  if (lang !== 'id' && lang !== 'en') {
    return NextResponse.redirect(new URL(redirect, origin))
  }

  const response = NextResponse.redirect(new URL(redirect, origin))
  response.cookies.set('cukkr_lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}
