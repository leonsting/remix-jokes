import type { MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
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

export function CatchBoundary() {
	const caught = useCatch();

	if (caught.status === 404) {
		return (
			<html>
				<head>
					<title>Oops!</title>
					<Meta />
					<Links />
				</head>
				<body>
					<h1>
						{caught.status} {caught.statusText}
					</h1>
					<Scripts />
				</body>
			</html>
		);
	}

	throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
