import { useState, useEffect } from "react";
import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { BeakerIcon } from "@heroicons/react/solid";
import Spline from "@splinetool/react-spline";

import { Player, Song } from "~/components/player";

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

export const loader: LoaderFunction = () => {
	const songs: Song[] = [
		{
			title: "Vì mẹ anh bắt chia tay",
			artist: "Châu Đăng Khoa",
			album: "Vì mẹ anh bắt chia tay(Single)",
			track: "$orries",
			year: 2022,
			coverSrc: "/images/songs/vmabct.jpg",
			src: "/audio/songs/vmabct.mp3",
		},
		{
			title: "Thiêu Thân",
			artist: "B'Ray",
			album: "Thiểu Thân(Single)",
			track: "$orries",
			year: 2022,
			coverSrc: "/images/songs/tt.jpg",
			src: "/audio/songs/tt.mp3",
		},
	];
	return json<LoaderData>({ songs });
};

export default function Index() {
	const { songs } = useLoaderData() as LoaderData;
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

	useEffect(() => {
		setNextSongIndex(() => {
			if (currentSongIndex + 1 > songs.length - 1) {
				return 0;
			} else {
				return currentSongIndex + 1;
			}
		});
	}, [currentSongIndex]);

	return (
		<div className="relative font-IBM">
			<Spline
				className="absolute m-0 top-0 right-0"
				scene="https://prod.spline.design/nKzouKpPRJKrHvau/scene.splinecode"
			/>
			<div className="absolute top-8 flex flex-col gap-10">
				<h1 className="text-6xl font-normal leading-tight mt-0 mr-8 mb-0 ml-28 max-w-md">
					Taverse
				</h1>

				<Player
					className="max-w-md mr-8 ml-28"
					currentSongIndex={currentSongIndex}
					setCurrentSongIndex={setCurrentSongIndex}
					nextSongIndex={nextSongIndex}
					songs={songs}
				/>
			</div>
		</div>
	);
}
