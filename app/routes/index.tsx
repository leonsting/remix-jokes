import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import Spline from "@splinetool/react-spline";

import type { Song } from "@prisma/client";

import { Player } from "~/components/player";
import { CompanionComponent } from "~/components/companion";
import { getSongs } from "~/models/song.server";

// import stylesUrl from "~/styles/index.css";
import { links as playerLinks } from "~/components/player";
import tailwindStyles from "~/tailwind.css";
import { useLoaderData } from "@remix-run/react";

export const links: LinksFunction = () => {
	return [
		// {
		// 	rel: "stylesheet",
		// 	href: stylesUrl,
		// },
		{ rel: "stylesheet", href: tailwindStyles },
		...playerLinks(),
	];
};

type LoaderData = {
	songs: Song[];
};

export const loader: LoaderFunction = async () => {
	const songs = await getSongs();
	return json<LoaderData>({ songs });
};

export default function Index() {
	const { songs } = useLoaderData() as LoaderData;

	return (
		<div className="relative font-IBM">
			<CompanionComponent defaultShow>
				<Player className="max-w-md rounded-l-none" songs={songs} />
			</CompanionComponent>
			<Spline
				className="absolute m-0 top-0 right-0"
				scene="https://prod.spline.design/nKzouKpPRJKrHvau/scene.splinecode"
			/>
			<div className="absolute top-8 flex flex-col gap-10">
				<h1 className="text-6xl font-normal leading-tight mt-0 mr-8 mb-0 ml-20 max-w-md">
					Taverse
				</h1>
			</div>
		</div>
	);
}
