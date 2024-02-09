import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import useGetLocalStorage from './components/hooks/useGetLocalStorage'

const protectedRoutes = ['/', '/manage-school']
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const login = useGetLocalStorage()
    //     if(!login && protectedRoutes.includes(request.nextUrl.pathname)){
    //         return NextResponse.redirect(new URL('/login', request.nextUrl))
    //     }
}

