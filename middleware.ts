import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
	const session = await auth();
	const protectedRoutes = ['/profile', '/settings']; // Rutas protegidas

	if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
		if (!session) {
			const url = new URL('/', req.url); // Redirigir a login si no está autenticado
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/profile/:path*', '/settings/:path*'], // Define las rutas a proteger
};
