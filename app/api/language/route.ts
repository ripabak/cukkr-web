import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lang = searchParams.get('lang')
  const redirect = searchParams.get('redirect') ?? '/'

  if (lang !== 'id' && lang !== 'en') {
    return NextResponse.redirect(new URL(redirect, request.url))
  }

  const response = NextResponse.redirect(new URL(redirect, request.url))
  response.cookies.set('cukkr_lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}
