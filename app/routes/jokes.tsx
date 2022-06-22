import type { LinksFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";
import globalStylesUrl from "~/styles/global.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalLargeStylesUrl from "~/styles/global-large.css";

import jokeStylesUrl from "~/styles/jokes.css";

export const links: LinksFunction = () => {
	return [
		{
			rel: "stylesheet",
			href: globalStylesUrl,
		},
		{
			rel: "stylesheet",
			href: globalMediumStylesUrl,
			media: "print, (min-width: 640px)",
		},
		{
			rel: "stylesheet",
			href: globalLargeStylesUrl,
			media: "screen and (min-width: 1024px)",
		},
		{ rel: "stylesheet", href: stylesUrl },
		{ rel: "stylesheet", href: jokeStylesUrl },
	];
};

export default function JokesRoute() {
	return (
		<div className="jokes-layout">
			<header className="jokes-header">
				<div className="container">
					<h1 className="home-link">
						<Link
							to="/"
							title="Remix Jokes"
							aria-label="Remix Jokes"
						>
							<span className="logo">🤪</span>
							<span className="logo-medium">J🤪KES</span>
						</Link>
					</h1>
				</div>
			</header>
			<main className="jokes-main">
				<div className="container">
					<div className="jokes-list">
						<Link to=".">Get a random joke</Link>
						<p>Here are a few more jokes to check out:</p>
						<ul>
							<li>
								<Link to="some-joke-id">Hippo</Link>
							</li>
						</ul>
						<Link to="new" className="button">
							Add your own
						</Link>
					</div>
					<div className="jokes-outlet">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
