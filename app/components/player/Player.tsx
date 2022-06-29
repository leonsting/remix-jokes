import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@remix-run/react";
import {
	HeartIcon,
	RefreshIcon,
	SwitchVerticalIcon,
	DotsHorizontalIcon,
} from "@heroicons/react/solid";
import cls from "classnames";
import styles from "./styles.css";

import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

export const links = () => [{ rel: "stylesheet", href: styles }];

export interface Song {
	title: string;
	artist: string;
	album: string;
	track: string;
	year: number;
	coverSrc: string;
	src: string;
}

interface PlayerProps {
	className?: string;
	songs: Song[];
}

export function Player({ className, songs }: PlayerProps) {
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const nextSongIndex = useMemo(() => {
		if (currentSongIndex + 1 > songs.length - 1) {
			return 0;
		} else {
			return currentSongIndex + 1;
		}
	}, [currentSongIndex]);

	const currentSong = songs[currentSongIndex];
	const nextSong = songs[nextSongIndex];

	const skipToNextSong = () => {
		setCurrentSongIndex(() => {
			let temp = currentSongIndex;
			temp++;

			if (temp > songs.length - 1) {
				temp = 0;
			}

			return temp;
		});
		setIsPlaying(false);
	};

	const skipToPerviousSong = () => {
		setCurrentSongIndex(() => {
			let temp = currentSongIndex;
			temp--;

			if (temp < 0) {
				temp = songs.length - 1;
			}
			return temp;
		});
		setIsPlaying(false);
	};

	return (
		<div
			className={cls(
				className,
				"card w-96 bg-neutral-content text-black"
			)}
		>
			<div className="p-4">
				<div className="text-2xl font-semibold text-center">
					<strong>Upcoming Song:</strong>
				</div>
				<div className="mt-4 flex flex-row p-1 h-16 items-center">
					<div className="avatar">
						<div className="w-20 mask mask-hexagon">
							<img
								src={nextSong?.coverSrc}
								alt={nextSong?.title}
							/>
						</div>
					</div>
					<p>
						<span className="font-bold mx-2" data-text-highlight>
							{nextSong?.title}
						</span>
						by
						<span className="font-bold mx-2" data-text-highlight>
							{nextSong?.artist}
						</span>
					</p>
				</div>
			</div>
			<div className="mt-4 mx-auto max-w-md">
				<PlayerDetails isPlaying={isPlaying} song={currentSong} />
				<PlayerControls
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					next={skipToNextSong}
					back={skipToPerviousSong}
				/>
				<div className="flex justify-between pt-2 px-4 pb-4 text-primary">
					<Link to="/heart" className="btn glass text-primary btn-xs">
						<HeartIcon className="w-5 h-5" />
					</Link>
					<Link
						to="/random"
						className="btn glass text-primary btn-xs"
					>
						<SwitchVerticalIcon className="w-5 h-5" />
					</Link>
					<Link
						to="/refesh"
						className="btn glass text-primary btn-xs"
					>
						<RefreshIcon className="w-5 h-5" />
					</Link>
					<Link to="/more" className="btn glass text-primary btn-xs">
						<DotsHorizontalIcon className="w-5 h-5" />
					</Link>
				</div>
			</div>
		</div>
	);
}
