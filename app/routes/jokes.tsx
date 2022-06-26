import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

import { json } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";
import globalStylesUrl from "~/styles/global.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalLargeStylesUrl from "~/styles/global-large.css";

import jokeStylesUrl from "~/styles/jokes.css";

export const links: LinksFunction = () => {
	return [
		// { rel: "stylesheet", href: stylesUrl },
		{ rel: "stylesheet", href: jokeStylesUrl },
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
	];
};

type LoaderData = {
	jokeListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
	const data: LoaderData = {
		jokeListItems: await db.joke.findMany(),
	};
	return json(data);
};

export default function JokesRoute() {
	const data = useLoaderData<LoaderData>();

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
							{data.jokeListItems.map((joke) => (
								<li key={joke.id}>
									<Link to={joke.id}>{joke.name}</Link>
								</li>
							))}
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
