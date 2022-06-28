import type { MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Taverse",
	viewport: "width=device-width,initial-scale=1",
});

export default function App() {
	return (
		<html data-theme="synthwave" lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="bg-base-100 font-baloo">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
