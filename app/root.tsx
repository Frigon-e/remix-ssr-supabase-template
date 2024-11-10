import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles }
  ];
}

export default function App() {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
      <title>Remix Supabase App</title>
    </head>
    <body className="flex flex-col items-center justify-center min-h-screen font-sans">
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}
