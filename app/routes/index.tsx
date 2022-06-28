import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Spline from "@splinetool/react-spline";

import stylesUrl from "~/styles/index.css";
import tailwindStyles from "~/tailwind.css";

export const links: LinksFunction = () => {
	return [
		{
			rel: "stylesheet",
			href: stylesUrl,
		},
		{ rel: "stylesheet", href: tailwindStyles },
	];
};

export default function Index() {
	return (
		<div className="container">
			<Spline scene="https://prod.spline.design/nKzouKpPRJKrHvau/scene.splinecode" />
		</div>
	);
}
