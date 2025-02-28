import { Links, Meta, Outlet, redirect, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import './tailwind.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: '/fonts/Inter-VariableFont_opsz,wght.ttf',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/Assistant-VariableFont_wght.ttf',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
  ];
};

const mockUser = {
  name: 'Brian Johnson',
  avatar: '/images/avatar.png',
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const isLoginPage = url.pathname === '/login';

  const cookieHeader = request.headers.get('Cookie') || '';
  const isAuthenticated = cookieHeader.includes('authenticated=true');

  if (!isAuthenticated && !isLoginPage) {
    return redirect('/login');
  }

  return { user: mockUser };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
