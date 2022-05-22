// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'

// export async function middleware(req) {
//   //token will exist if user is logged in
//   const token = await getToken({ req, secret: process.env.JWT_SECRET })
//   const { pathname } = req.nextUrl
//   // allow the requests if the following are true..
//   //1. its a request for next-auth session and provider fetching
//   // 2. the token exists
//   if (pathname.includes('/api/auth') || token) {
//     return NextResponse.next()
//   }
//   // redirect them to login if they dont have a token AND are requesting are protected route
//   if (!token && pathname !== '/login') {
//     return NextResponse.redirect('/login')
//   }
// }

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  // token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl

  // ALlow the request if the following is true:
  // 1 it's a request to next-auth session
  // 2 the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // redirect to login page if the user is not logged in and they are requesting a protected routeing a protected route
  if (!token && pathname !== url.pathname) {
    return NextResponse.rewrite(new URL('/login', req.url))
  }
}
